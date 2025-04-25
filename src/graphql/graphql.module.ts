import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { createYoga } from 'graphql-yoga';
import { useGraphQlJit } from '@envelop/graphql-jit';
import { createPubSub } from '@graphql-yoga/subscription';
import { cvs, skills, users } from 'src/database';

const pubSub = createPubSub<Record<string, any>>();

@Module({
  imports: [
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: true,
      context: () => ({
        db: { skills, users, cvs }, 
      }),
      useGlobalPrefix: true,
      transformSchema: (schema) => {
        const yoga = createYoga({
          schema,
          plugins: [useGraphQlJit()],
        });
        return schema;
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: pubSub,
    },
  ],
  exports: ['PUB_SUB'],
})
export class GraphqlModule {}
