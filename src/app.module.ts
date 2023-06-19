import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get('MONGO_URI', 'mongodb://localhost:27017/dexerto'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: process.env['NODE_ENV'] === 'development',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          message: error?.extensions?.exception?.message || error?.message,
          extensions: {
            ...error?.extensions,
          },
        };
        return graphQLFormattedError;
      },
    }),
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
