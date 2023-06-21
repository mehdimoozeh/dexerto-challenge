import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GameService } from './game.service';
import { NewGameInput } from './inputs/new-game.input';
import { Game } from './models/game.model';

@Resolver()
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => String)
  games() {
    return 'games';
  }

  @Mutation(() => Game)
  newGame(@Args('newGameInput') newGameInput: NewGameInput) {
    return this.gameService.create(newGameInput);
  }
}
