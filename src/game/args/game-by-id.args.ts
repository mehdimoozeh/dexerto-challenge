import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class GameByIdArgs {
  @IsMongoId()
  @Field()
  gameId: string;
}
