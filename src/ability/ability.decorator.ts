import { SetMetadata } from "@nestjs/common";
import { Action, Subjects } from "./ability.factory";

export const CHECK_ABILITY = 'check_ability';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)

export interface RequiredRule {
    action: Action;
    subject: Subjects;
}

export const CheckAbilites = (...requirements : RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements)