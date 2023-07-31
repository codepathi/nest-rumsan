import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {

    @ApiProperty({
        description: "test@rumsan.com",
        name: "email"
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "test123",
        name: "password"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}