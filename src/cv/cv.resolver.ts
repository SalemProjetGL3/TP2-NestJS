import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { CV } from './cv.entity';
import { CreateCVInput } from './inputs/create-cv.input';
import { UpdateCVInput } from './inputs/update-cv.input';
import { CVService } from './cv.service';
import { UserService } from "@/user/user.service";
import { SkillService } from "@/skill/skill.service";

@Resolver(() => CV)
export class CvResolver {

  constructor(
    private readonly cvService: CVService, 
    private readonly userService : UserService,
    private readonly skillService : SkillService,
  ) {}

  @Query(() => [CV])
  async cvs() {
    return this.cvService.findAll().map(cv => this.hydrate(cv));
  }

  @Query(() => CV, { nullable: true })
  async cv(
    @Args('id') id: number
  ) {
    const cv = this.cvService.findOne(id);
    return cv ? this.hydrate(cv) : null;
  }

  @Mutation(() => CV)
  async createCV(
    @Args('input') input: CreateCVInput
  ) {
    // check if userId and skillIds are valid
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
    return this.hydrate(rawCv);
  }

  @Mutation(() => CV)
  async updateCV(
    @Args('input') input: UpdateCVInput
  ) {
    // check if skillIds are valid
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
    return this.hydrate(updated);
  }

  @Mutation(() => Boolean)
  async deleteCV(
    @Args('id') id: number,
    @Context() ctx: { db: any }
  ) {
    id = parseInt(id.toString(), 10);
    return this.cvService.delete(id);
  }

  private hydrate(cv: CV): CV {
    return {
      ...cv,
      user: this.userService.findOne(cv.userId),
      skills: cv.skillIds.map(skillId => this.skillService.findOne(skillId)),
    } as CV;
  }
}