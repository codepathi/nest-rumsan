import { Module } from '@nestjs/common';
import { ManageRoleService } from './manage-role.service';
import { ManageRoleController } from './manage-role.controller';

@Module({
  controllers: [ManageRoleController],
  providers: [ManageRoleService]
})
export class ManageRoleModule {}
