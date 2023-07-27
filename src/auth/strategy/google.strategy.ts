import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy } from "passport-jwt";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            clientID: "39996116735-klru1gcrjt3b9b1ir7e1flp29f11iuu3.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3333/api/auth/google/redirect",
            scope: ['profile', 'email']
        })
    }

    async validate(accessToken:string, refreshToken: string, Profile: Profile){
        console.log(accessToken)
        console.log(refreshToken)
        console.log(Profile)
    }
}