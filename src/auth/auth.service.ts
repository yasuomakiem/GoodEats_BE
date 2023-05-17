import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity as User } from 'src/user/user.entiy/user.entity';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { AuthDTO } from './auth.dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly cfgService: ConfigService,
    ) { }

    async login(acc: AuthDTO) {
        const acc_found = await this.userRepo.findOne({
            where: [{ username: acc.username }],
        });

        if (!acc_found) {
            throw new ForbiddenException('User not found');
        }

        const matchPass = await argon.verify(acc_found.password, acc.password);
        if (!matchPass) {
            throw new ForbiddenException('Passwords does not match');
        }

        delete acc_found.password;
        console.log(acc_found);

        return await this.setToken(acc_found.username);


    }

    async checkUserExists(username: string): Promise<User> {
        const ext_user = await this.userRepo.findOne({
          where: [{ username: username }],
        });
        return ext_user;
      }


    async setToken(username: string): Promise<{
        accessToken: string;
        // refreshToken: string;
    }> {
        const payload = {
            subject: username,
            
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '30m',
            secret: this.cfgService.get('SECRET_TOKEN_KEY'),
        });
        return {
            accessToken,
            //   refreshToken,
        };
    }

    

    // async deleteToken()


}