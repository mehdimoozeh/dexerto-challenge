import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse } from './inputs';

@Resolver('Authentication')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse, { nullable: true })
  login(@Args('loginInput') loginInput: LoginInput, @Context() context: any) {
    const user: LoginResponse = context.req.user;
    user.token = this.authService.generateToken(
      user.email,
      user._id.toString(),
    );
    return user;
  }
}
