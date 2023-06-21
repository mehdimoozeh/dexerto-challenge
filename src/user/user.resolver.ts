import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterInput, RegisterResponse } from './inputs';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => RegisterResponse)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    const result = await this.userService.registerUser(
      registerInput.email,
      registerInput.password,
    );
    return result;
  }
}
