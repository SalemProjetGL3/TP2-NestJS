import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @Field(() => ID)
  id: number;
}