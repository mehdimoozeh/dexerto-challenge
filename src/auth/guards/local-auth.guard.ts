import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class LocalAuthGuard extends AuthGuard('local') {
  // Override this method so it can be used in graphql
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const graphQLRequest = ctx.getContext().req;
    if (graphQLRequest) {
      const { variables } = ctx.getArgs();
      graphQLRequest.body = variables;
      return graphQLRequest;
    }
    return context.switchToHttp().getRequest();
  }
}
