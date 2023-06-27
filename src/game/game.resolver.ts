import {
  Args,
  Mutation,
  Resolver,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GameService } from './game.service';
import { NewGameInput } from './inputs/new-game.input';
import { Game } from './models/game.model';
import { ReviewService } from './review.service';
import { GameByIdArgs } from './args/game-by-id.args';
import { Review } from './models/review.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Game)
export class GameResolver {
  constructor(
    private readonly gameService: GameService,
    private readonly reviewService: ReviewService,
  ) {}

  @ResolveField(() => [Review])
  private async reviews(@Parent() game: Game): Promise<Review[]> {
    const result = await this.reviewService.getReviewsByGameId(
      game._id.toString(),
      10,
      1,
    );
    return result.reviews;
  }

  @Query(() => Game)
  async gameById(@Args() gameByIdArgs: GameByIdArgs): Promise<Game> {
    const result = await this.gameService.getGameById(gameByIdArgs.gameId);
    return result;
  }

  @Query(() => [Game])
  async allGames() {
    return await this.gameService.getAllGames();
  }

  @Mutation(() => Game)
  newGame(@Args('newGameInput') newGameInput: NewGameInput) {
    return this.gameService.create(newGameInput);
  }
}
