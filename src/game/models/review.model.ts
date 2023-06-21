import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
export class Review {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  rating: string;

  @Field()
  @Prop()
  comment: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
