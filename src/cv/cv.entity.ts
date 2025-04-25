import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@/user/user.entity';
import { Skill } from '@/skill/skill.entity';
import { BaseEntity } from '@/common/base/base.entity';

@ObjectType()
export class CV extends BaseEntity{
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  job: string;

  @Field(() => ID) 
  userId: number;

  @Field(() => [ID]) 
  skillIds: number[];

  @Field(() => User, { nullable: true }) 
  user?: User;

  @Field(() => [Skill], { nullable: true }) 
  skills?: Skill[];
}