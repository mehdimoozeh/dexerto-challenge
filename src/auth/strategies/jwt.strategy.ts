import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/models/user.model';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<User> | null {
    const result = await this.authService.getUserByEmail(
      validationPayload.email,
    );
    if (!result) throw new AuthenticationError('Invalid token!');
    return result;
  }
}
