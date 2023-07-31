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

    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        done(null, profile);
    }
}