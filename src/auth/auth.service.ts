import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.userModel.findOne({
      email,
    });
    return result;
  }

  async generateHashPassword(password: string): Promise<string> {
    const SALT_ROUND = 10;
    return bcrypt.hash(password, SALT_ROUND);
  }

  generateToken(email: string, id: string): string {
    const payload = {
      email,
      sub: id,
    };
    return this.jwtService.sign(payload);
  }

  async validate(email: string, password: string): Promise<User> | null {
    const user = await this.getUserByEmail(email);
    if (!user)
      throw new AuthenticationError('Username or password is incorrect!');

    if (await bcrypt.compare(password, user.password)) return user;

    return null;
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
    const user = await this.getUserByEmail(decoded.email);
    if (!user) {
      throw new AuthenticationError('Invalid user token!');
    }
    return user;
  }
}
