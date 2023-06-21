import { Injectable } from '@nestjs/common';
import { NewGameInput } from './inputs/new-game.input';
import { Game, GameDocument } from './models/game.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>,
  ) {}

  async create(newGameInput: NewGameInput): Promise<Game> {
    const newGame = await this.gameModel.create(newGameInput);
    return newGame;
  }
}
