import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../database';
import { Skill } from '../database';

@ObjectType()
export class CV {
  @Field(() => ID)
  id: string;

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

  @Field(() => User, { nullable: true }) 
  user?: User;

  @Field(() => [Skill], { nullable: true }) 
  skills?: Skill[];
}