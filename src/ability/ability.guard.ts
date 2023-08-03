import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {ForbiddenError} from '@casl/ability'
import { Action } from './ability.factory';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class AbilityGuard implements CanActivate {
  abilityFactory: any;
  bookService: any;

  constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const {role} = request.user;

    const user = {id: 1, email: 'new@new.com', roles: ['client']}
    const ability = this.abilityFactory.defineAbility(user)

    // const isAllowed = ability.can(Action.Create, Book)   //Can do this way also

    // if(!isAllowed){
    //   throw new ForbiddenException('Noooo!')
    // }

    try {
      ForbiddenError.from(ability).setMessage('Noooo!').throwUnlessCan(Action.Create, Book)
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }

    // Without casl

    // const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler())
    
    // function hasAccess(allowedRoles:string[], userRoles:string[]) {
    //   // Check if any of the userRoles is present in the allowedRoles array
    //   return userRoles.some(role => allowedRoles.includes(role));
    // }
    
    // const accessGranted = hasAccess(allowedRoles, role);

    return true;
  }
}
