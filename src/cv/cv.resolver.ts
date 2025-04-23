import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { CV } from './cv.entity';

@Resolver(() => CV)
export class CvResolver {
  @Query(() => [CV])
  async cvs(@Context() ctx: { db: any }) {
    const { cvs, users, skills } = ctx.db;
    
    return cvs.map(cv => ({
      ...cv,
      user: users.find(user => user.id === cv.userId),
      skills: skills.filter(skill => cv.skillIds.includes(skill.id)),
    }));
  }

  @Query(() => CV, { nullable: true })
  async cv(
    @Args('id') id: string,
    @Context() ctx: { db: any }
  ) {
    const { cvs, users, skills } = ctx.db;
    const foundCv = cvs.find(cv => cv.id === id);
    
    if (!foundCv) return null;

    return {
      ...foundCv,
      user: users.find(user => user.id === foundCv.userId),
      skills: skills.filter(skill => foundCv.skillIds.includes(skill.id)),
    };
  }
}