import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ManageRoleService } from './manage-role.service';
import { CreateManageRoleDto } from './dto/create-manage-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from 'src/ability/ability.guard';
import { Roles } from 'src/ability/ability.decorator';

@Controller('manage-role')
export class ManageRoleController {
  constructor(private readonly manageRoleService: ManageRoleService) {}


  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  create(@Param('id', ParseIntPipe) id:number, @Body() createManageRoleDto: CreateManageRoleDto) {
    return this.manageRoleService.addRole(createManageRoleDto, id);
  }

  @UseGuards(AbilityGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Patch('/delete/:id')
  removeRole(@Param('id', ParseIntPipe) id:number, @Body() createManageRoleDto: CreateManageRoleDto) {
    return this.manageRoleService.removeRole(createManageRoleDto, id);
  }
}
