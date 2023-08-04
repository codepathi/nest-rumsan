import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from '@nestjs/config'
import { BookModule } from './book/book.module';
import { ManageRoleModule } from './manage-role/manage-role.module';
import { AbilityModule } from './ability/ability.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    BookModule,
    ManageRoleModule,
    AbilityModule],
})
export class AppModule {}
