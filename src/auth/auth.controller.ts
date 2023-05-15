import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto/auth.dto';
import { plainToClass } from 'class-transformer';

@Controller('user')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() acc: AuthDTO){
        const validateData = plainToClass(AuthDTO, acc, {
            excludeExtraneousValues: true,
          });

        return await this.authService.login(validateData);
    }
}