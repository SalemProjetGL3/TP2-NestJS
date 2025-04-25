import { BaseService } from "@/common/base/base.service";
import { Skill } from "./skill.entity";

export class SkillService extends BaseService<Skill> {
  protected contextKey = "skills";
}