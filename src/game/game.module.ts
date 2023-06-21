import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './models/review.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  providers: [GameService, GameResolver, ReviewResolver, ReviewService],
})
export class GameModule {}
