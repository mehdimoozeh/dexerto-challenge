import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerGuard } from './Guards/GqlThrottler.guard';

@UseGuards(GqlThrottlerGuard)
@Resolver(() => String)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello(): string {
    return this.appService.getHello();
  }
}
