import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prisma:PrismaService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const {user} = context.switchToHttp().getRequest();
    const userRoles = user.role;

    const isAdmin = userRoles.includes('admin')

    if(isAdmin === false){
      throw new ForbiddenException('Only admin can change role')
    }

    return isAdmin;
  }
}
