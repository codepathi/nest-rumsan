import { Body, Controller, Get, Post, UseGuards, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('api/auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    async signup(@Body() dto: AuthDto){
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto);
    }

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async handleGoogleLogin() {
        return {msg: 'Google Authentication.'}
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async handleRedirectGoogle(@Req() req, @Res() res) {
        const jwt = await this.authService.googleLogin(req.user)
        return {msg: 'This is redirected from google.'}
    }
}