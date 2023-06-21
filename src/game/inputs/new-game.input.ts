import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Game } from '../models/game.model';

@InputType()
export class NewGameInput implements Partial<Game> {
  @IsString()
  @MinLength(3)
  @Field()
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Field()
  description: string;

  @IsDateString()
  @Field()
  releaseDate: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @Field()
  averageRating: number;
}
