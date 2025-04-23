import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { createYoga } from 'graphql-yoga';
import { useGraphQlJit } from '@envelop/graphql-jit';
import { cvs, skills, users } from 'src/database';

@Module({
  imports: [
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      // typePaths: ['./**/*.graphql'],
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
    }),
  ],
})
export class GraphqlModule {}