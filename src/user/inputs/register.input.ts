import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class RegisterInput implements Partial<User> {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}

@ObjectType()
export class RegisterResponse extends User {
  @Field()
  token: string;
}
