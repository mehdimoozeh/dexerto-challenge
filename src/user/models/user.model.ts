import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
@ObjectType({ description: 'User ' })
export class User {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ required: true })
  password: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  avatarUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
