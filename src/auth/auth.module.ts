import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {JwtModule} from '@nestjs/jwt'
import { jwtStrategy } from "./strategy/jwt.strategy";
import { GoogleStrategy } from "./strategy/google.strategy";

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, jwtStrategy, GoogleStrategy]
})
export class AuthModule {}