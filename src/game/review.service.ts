import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from './models/review.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewReviewInput } from './inputs/new-review.input';
import { Game, GameDocument } from './models/game.model';
import { UserInputError } from '@nestjs/apollo';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    @InjectModel(Game.name)
    private readonly gameModel: Model<GameDocument>,
  ) {}

  async create(
    userId: Types.ObjectId,
    review: NewReviewInput,
  ): Promise<Review> {
    const game = await this.gameModel.findOne({ _id: review.gameId });
    if (!game)
      throw new UserInputError('Game id is wrong!', {
        extensions: {
          originalError: {
            statusCode: 400,
          },
        },
      });
    const newReview = await this.reviewModel.create(
      Object.assign(review, { userId }),
    );
    return newReview;
  }
}
