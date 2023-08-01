import { IsNotEmpty, IsString } from "class-validator";

export class CreateManageRoleDto {
    @IsNotEmpty()
    @IsString()
    addedRole:string
}
