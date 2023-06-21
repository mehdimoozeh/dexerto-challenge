import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsMongoId, Max, Min } from 'class-validator';
import { Review } from '../models/review.model';

@ArgsType()
export class ReviewsArgs {
  @IsMongoId()
  @Field()
  gameId: string;

  @Min(1)
  @Max(20)
  @Field({ defaultValue: 10 })
  limit: number;

  @Min(1)
  @Field({ defaultValue: 1 })
  page: number;
}

@ObjectType()
export class ReviewsResponse {
  @Field(() => [Review])
  reviews: Review[];

  @Field()
  total: number;

  @Field()
  page: number;
}
