import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCVInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  job?: string;

  @Field(() => [ID], { nullable: true })
  skillIds?: number[];
}