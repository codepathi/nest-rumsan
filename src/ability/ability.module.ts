import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { AbilityGuard } from './ability.guard';
import { Reflector } from '@nestjs/core';

@Module({
    providers: [AbilityFactory, AbilityGuard],
    exports: [AbilityFactory]
})
export class AbilityModule {}
