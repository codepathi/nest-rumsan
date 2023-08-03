import { Module } from '@nestjs/common';
import { ManageRoleService } from './manage-role.service';
import { ManageRoleController } from './manage-role.controller';
import { AbilityFactory } from 'src/ability/ability.factory';
import { AbilityGuard } from 'src/ability/ability.guard';

@Module({
  controllers: [ManageRoleController],
  providers: [ManageRoleService, AbilityGuard, AbilityFactory]
})
export class ManageRoleModule {}
