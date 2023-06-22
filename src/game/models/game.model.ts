import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export const GameSchema = SchemaFactory.createForClass(Game);
