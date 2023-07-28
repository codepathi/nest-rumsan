import { ForbiddenException, Injectable } from "@nestjs/common"
import { User, Bookmark } from "@prisma/client"
import { AuthDto } from "./dto"
import { PrismaService } from "src/prisma/prisma.service"
import * as bcrypt from "bcrypt"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import {JwtService} from '@nestjs/jwt'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class AuthService {

    constructor(private prisma:PrismaService, private jwt: JwtService, private config: ConfigService){}
    
    async signup(dto: AuthDto){

        try {
            const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(dto.password, salt);
        
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash
            }
        })

        delete user.hash;
        return user
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code = "P2002"){
                    throw new ForbiddenException('Email already exists')
                }
            }
            throw error
        }        
    }

    async signin(dto : AuthDto) {

        const user = await this.prisma.user.findUnique({where: {email: dto.email}})

        // If no user with that email
        if(!user) throw new ForbiddenException('Email not found');

        // Compare password
        const correct = await bcrypt.compare(dto.password, user.hash)

        // If password incorrect
        if(!correct) throw new ForbiddenException('Incorrect password')

        const token = await this.signToken(user.id, user.email)

        return {accessToken : token}
    }

    signToken(userId:number, email:string):Promise<string> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET');
        return this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })
    }

    async googleLogin(email:string){
        const token = await this.signToken(11111, email)
        console.log({token: token})
        return {accessToken : token}
    }
}