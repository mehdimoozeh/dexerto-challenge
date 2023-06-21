import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
export class Review {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Field()
  @Prop({ type: Types.ObjectId, ref: 'Game' })
  gameId: string;

  @Field()
  @Prop({ min: 0, max: 5 })
  rating: number;

  @Field()
  @Prop()
  comment: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
