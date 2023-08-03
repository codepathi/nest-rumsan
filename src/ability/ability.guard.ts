import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {ForbiddenError} from '@casl/ability'
import { AbilityFactory, Action, Subjects } from './ability.factory';
import { Book } from 'src/book/entities/book.entity';
import { CHECK_ABILITY } from './ability.decorator';


interface RuleType {
  action: Action;
  subject: Subjects;
}
@Injectable()
export class AbilityGuard implements CanActivate {
  
  constructor(private reflector: Reflector, private abilityFactory: AbilityFactory){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const rules = this.reflector.get(CHECK_ABILITY, context.getHandler())

    const request = context.switchToHttp().getRequest();
    const users = request.user;
    delete users.iat;
    delete users.exp;

    const ability = this.abilityFactory.defineAbility(users)

    // const isAllowed = ability.can(Action.Create, Book)   //Can do this way also

    // if(!isAllowed){
    //   throw new ForbiddenException('Noooo!')
    // } 

    try {
      rules.forEach((rule : RuleType) => {
        ForbiddenError.from(ability).setMessage('Noooo!').throwUnlessCan(rule.action, rule.subject)
      })
      
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }

    return true;
  }
}
