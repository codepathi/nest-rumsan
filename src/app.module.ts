import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from '@nestjs/config'
import { BookModule } from './book/book.module';
import { ManageRoleModule } from './manage-role/manage-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    BookModule,
    ManageRoleModule],
})
export class AppModule {}
