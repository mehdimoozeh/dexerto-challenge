import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GameService } from './game.service';
import { NewGameInput } from './inputs/new-game.input';
import { Game } from './models/game.model';

@Resolver()
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => [Game])
  async allGames() {
    return await this.gameService.getAllGames();
  }

  @Mutation(() => Game)
  newGame(@Args('newGameInput') newGameInput: NewGameInput) {
    return this.gameService.create(newGameInput);
  }
}
