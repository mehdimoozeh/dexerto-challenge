import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Review } from './review.model';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema({ versionKey: false, timestamps: true })
@ObjectType()
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

  @Field(() => [Review])
  @Prop({ default: [] })
  reviews: Review[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
