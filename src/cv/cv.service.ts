import { BaseService } from "@/common/base/base.service";
import { CV } from "./cv.entity";

export class CVService extends BaseService<CV> {
  protected contextKey = "cvs";

  findByUserId(userId: number): CV[] {
    return this.findAll().filter((cv) => cv.userId === userId);
  }

  findBySkillId(skillId: number): CV[] {
    return this.findAll().filter((cv) => cv.skillIds.includes(skillId));
  }
}