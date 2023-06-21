import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { EmailSanitizer } from '../helper/email-sanitizer';
import { UserInputError } from '@nestjs/apollo';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  public async registerUser(
    email: string,
    password: string,
  ): Promise<User & { token: string }> {
    const sanitizedEmail = EmailSanitizer.normalizeEmail(email);
    const isUserExist = await this.userModel.findOne({ email: sanitizedEmail });
    if (isUserExist) throw new UserInputError('DUPLICATE_EMAIL');
    const createdUser = await this.userModel.create({
      email: sanitizedEmail,
      password: await this.authService.generateHashPassword(password),
    });
    const token = this.authService.generateToken(
      createdUser.email,
      createdUser._id.toString(),
    );
    return {
      ...createdUser.toObject(),
      token,
    };
  }
}
