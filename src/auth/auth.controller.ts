import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto/auth.dto';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';

@Controller('user')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() acc: AuthDTO, @Res({passthrough:true}) res:Response){
        const validateData = plainToClass(AuthDTO, acc, {
            excludeExtraneousValues: true,
          });
          const access_token = await this.authService.login(validateData)
          
          access_token && res.cookie('access_token',access_token.accessToken)

        return await this.authService.login(validateData);
    }
}