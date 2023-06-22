import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Review } from './review.model';

export type GameDocument = HydratedDocument<Game>;

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
export class Game {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  releaseDate: string;

  @Field()
  @Prop()
  averageRating: number;

  @Field(() => [Review], { nullable: true })
  reviews: Review[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
