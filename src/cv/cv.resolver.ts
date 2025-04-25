import { Resolver, Query, Args, Context, Mutation, Subscription } from '@nestjs/graphql';
import { CV } from './cv.entity';
import { CreateCVInput } from './inputs/create-cv.input';
import { UpdateCVInput } from './inputs/update-cv.input';
import { CVService } from './cv.service';
import { UserService } from "@/user/user.service";
import { SkillService } from "@/skill/skill.service";
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-yoga';
import { Skill } from '@/skill/skill.entity';

@Resolver(() => CV)
export class CvResolver {

  constructor(
    private readonly cvService: CVService, 
    private readonly userService : UserService,
    private readonly skillService : SkillService,
    @Inject('PUB_SUB') private pubSub: PubSub<any>
  ) {}

  @Query(() => [CV])
  async cvs() {
    return this.cvService.findAll().map(async cv => await this.hydrate(cv));
  }

  @Query(() => CV, { nullable: true })
  async cv(
    @Args('id') id: number
  ) {
    const cv = this.cvService.findOne(id);
    return cv ? await this.hydrate(cv) : null;
  }

  @Mutation(() => CV)
  async createCV(
    @Args('input') input: CreateCVInput
  ) {
    input.userId = parseInt(input.userId.toString(), 10);
    const user = this.userService.findOne(input.userId);
    if (!user) {
      throw new Error(`User with id ${input.userId} not found`);
    }

    input.skillIds = input.skillIds.map(skillId => parseInt(skillId.toString(), 10));
    const skills = input.skillIds.map(skillId => this.skillService.findOne(skillId));
    if (skills.some(skill => !skill)) {
      throw new Error(`One or more skills not found`);
    }

    const rawCv = this.cvService.create(input);
    const hydrated = await this.hydrate(rawCv);
    await this.pubSub.publish('cvCreated', hydrated);
    return hydrated;
  }

  @Mutation(() => CV)
  async updateCV(
    @Args('input') input: UpdateCVInput
  ) {
    if(input.skillIds) {
      input.skillIds = input.skillIds.map(skillId => parseInt(skillId.toString(), 10));
      const skills = input.skillIds.map(skillId => this.skillService.findOne(skillId));
      if (skills.some(skill => !skill)) {
        throw new Error(`One or more skills not found`);
      }
    }
    input.id = parseInt(input.id.toString(), 10);
    
    const updated = this.cvService.update(input.id, input);
    if (!updated) throw new Error('CV not found');
    const hydrated = await this.hydrate(updated);

    await this.pubSub.publish('cvUpdated', hydrated);
    
    return hydrated;
  }

  @Mutation(() => Boolean)
  async deleteCV(
    @Args('id') id: number  ) {
      const deletedCv = await this.cvService.findOne(id);
      if (!deletedCv) throw new Error('CV not found');
      const success = await this.cvService.delete(id);
      if (success) await this.pubSub.publish('cvDeleted', deletedCv);
      return success;

  }

  private async hydrate(cv: CV): Promise<CV> {
    const user = await this.userService.findOne(cv.userId);
    const skills = (await Promise.all(cv.skillIds.map(id => this.skillService.findOne(id)))).filter((skill): skill is Skill => skill !== undefined);
    return { ...cv, user, skills };
  }
  
}