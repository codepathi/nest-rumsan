import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostBookGuard implements CanActivate {
  constructor(private prisma:PrismaService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const {role} = request.user;
    let state =  role.some((r:any) => r === 'moderator' || r === 'admin');

    if(state === false) {
      throw new ForbiddenException("Only admin and moderator can post")
    }

    return state;
  }
}
