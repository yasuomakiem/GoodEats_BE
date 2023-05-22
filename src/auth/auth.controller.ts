import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto/auth.dto';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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

    // @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logOut(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token');
        return {
            message: 'Đăng xuất thành công'
        }
    }
}