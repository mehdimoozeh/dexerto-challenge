import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './models/game.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [GameService, GameResolver],
})
export class GameModule {}
