import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateManageRoleDto } from './dto/create-manage-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ManageRoleService {

  constructor(private prisma: PrismaService){}

  async addRole(createManageRoleDto: CreateManageRoleDto, id : number) {
    const userRole = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    const roleArray = userRole.role;

    if(roleArray.includes(createManageRoleDto.addedRole)){
      throw new ForbiddenException({
        status: 400,
        message: `${createManageRoleDto.addedRole} is already assigned to user`
      })
    }
    else{
    roleArray.push(createManageRoleDto.addedRole)
    const pushRole = this.prisma.user.update({
      where: { id: id },
      data: {
        role: roleArray
      },
    })
    return pushRole;
  }
  }

  async removeRole(createManageRoleDto: CreateManageRoleDto, id : number) {
    const userRole = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    const roleArray = userRole.role;

    if(!roleArray.includes(createManageRoleDto.addedRole)){
      throw new ForbiddenException({
        status: 400,
        message: `${createManageRoleDto.addedRole} is not assigned to this user.`
      })
    }
    else{
    const filteredRoles = roleArray.filter((role) => role !== createManageRoleDto.addedRole);
    const pushRole = this.prisma.user.update({
      where: { id: id },
      data: {
        role: filteredRoles
      },
    })
    return pushRole;
  }
  }
}
