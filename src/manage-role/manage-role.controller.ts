import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ManageRoleService } from './manage-role.service';
import { CreateManageRoleDto } from './dto/create-manage-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './guards/manage-role.guard';

@Controller('manage-role')
export class ManageRoleController {
  constructor(private readonly manageRoleService: ManageRoleService) {}

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  create(@Param('id', ParseIntPipe) id:number, @Body() createManageRoleDto: CreateManageRoleDto) {
    return this.manageRoleService.addRole(createManageRoleDto, id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch('/delete/:id')
  removeRole(@Param('id', ParseIntPipe) id:number, @Body() createManageRoleDto: CreateManageRoleDto) {
    return this.manageRoleService.removeRole(createManageRoleDto, id);
  }
}
