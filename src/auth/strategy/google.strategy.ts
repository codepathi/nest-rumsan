import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, VerifyCallback, Profile} from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: "39996116735-klru1gcrjt3b9b1ir7e1flp29f11iuu3.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3333/api/auth/google/redirect",
            scope: ['email', 'profile']
        })
    }

    async validate (accessToken: string, refrestToken: string, profile: Profile, done: VerifyCallback) : Promise<any> {
        done(null, profile);
    }
}