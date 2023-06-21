import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './models/review.model';
import { UseGuards } from '@nestjs/common';
import { NewReviewInput } from './inputs/new-review.input';
import { User } from '../user/models/user.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  async newReview(
    @Args('NewReviewInput') newReviewInput: NewReviewInput,
    @Context() context,
  ): Promise<Review> {
    const user: User = context.req.user;
    return await this.reviewService.create(user._id, newReviewInput);
  }
}
