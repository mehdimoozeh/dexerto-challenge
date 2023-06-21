import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Review } from '../models/review.model';

@InputType()
export class NewReviewInput implements Partial<Review> {
  @IsMongoId()
  @Field(() => ID)
  gameId: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @Field()
  rating: number;

  @IsString()
  @MinLength(3)
  @Field()
  comment: string;
}
