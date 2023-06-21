import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';
import { User } from '../../user/models/user.model';

@InputType()
export class LoginInput implements Partial<User> {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Length(8)
  @Field()
  password: string;
}

@ObjectType()
export class LoginResponse extends User {
  @Field()
  token: string;
}
