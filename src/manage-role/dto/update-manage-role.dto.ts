import { PartialType } from '@nestjs/swagger';
import { CreateManageRoleDto } from './create-manage-role.dto';

export class UpdateManageRoleDto extends PartialType(CreateManageRoleDto) {}
