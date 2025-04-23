import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { CV } from './cv.entity';
import { CreateCVInput } from './inputs/create-cv.input';
import { UpdateCVInput } from './inputs/update-cv.input';

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

  @Mutation(() => CV)
  async createCV(
    @Args('input') input: CreateCVInput,
    @Context() ctx: { db: any }
  ) {
    const { cvs, users, skills } = ctx.db;
    const newCV = {
      id: `cv-${Date.now()}`,
      ...input,
    };
    cvs.push(newCV);
    
    return {
      ...newCV,
      user: users.find(user => user.id === input.userId),
      skills: skills.filter(skill => input.skillIds.includes(skill.id)),
    };
  }

  @Mutation(() => CV)
  async updateCV(
    @Args('input') input: UpdateCVInput,
    @Context() ctx: { db: any }
  ) {
    const { cvs, users, skills } = ctx.db;
    const cvToUpdate = cvs.find(cv => cv.id === input.id);
    if (!cvToUpdate) {
      throw new Error('CV not found');
    }

    const updatedCV = {
      ...cvToUpdate,
      ...input,
      skillIds: input.skillIds ?? cvToUpdate.skillIds,
    };

    Object.assign(cvToUpdate, updatedCV);

    return {
      ...updatedCV,
      user: users.find(user => user.id === updatedCV.userId),
      skills: skills.filter(skill => updatedCV.skillIds.includes(skill.id)),
    };
  }
}