import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from './models/review.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewReviewInput } from './inputs/new-review.input';
import { Game, GameDocument } from './models/game.model';
import { UserInputError } from '@nestjs/apollo';
import { ReviewsResponse } from './args/reviews.arg';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    @InjectModel(Game.name)
    private readonly gameModel: Model<GameDocument>,
  ) {}

  async getReviewsByGameId(
    gameId: string,
    limit: number,
    page: number,
  ): Promise<ReviewsResponse> {
    const total = await this.reviewModel.countDocuments({ gameId });
    const reviews = await this.reviewModel
      .find({ gameId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    return { reviews, total, page };
  }

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
