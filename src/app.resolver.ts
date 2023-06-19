import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver(() => String)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello(): string {
    return this.appService.getHello();
  }
}
