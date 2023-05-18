import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/user.entiy/user.entity';
import { Repository } from 'typeorm';
import { Request } from "express";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'authh') {
  constructor(
    configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.access_token;
      }]),
      secretOrKey: configService.get('SECRET_TOKEN_KEY'),
    });
  }

  async validate(payload: { subject: string }) {
    const user_found = await this.userRepo.findOne({
      where: [{ username: payload.subject }],
    });

    delete user_found.password;
    return user_found;
  }
}