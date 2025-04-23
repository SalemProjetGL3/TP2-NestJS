import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCVInput {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  job: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [ID])
  skillIds: string[];
}