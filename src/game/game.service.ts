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

  async getGameById(gameId: string, limit = 10): Promise<Game> {
    const game = await this.gameModel.findById(gameId).limit(limit);
    return game;
  }

  async create(newGameInput: NewGameInput): Promise<Game> {
    const newGame = await this.gameModel.create(newGameInput);
    return newGame;
  }

  async getAllGames(): Promise<Game[]> {
    const games = await this.gameModel.find();
    return games;
  }
}
