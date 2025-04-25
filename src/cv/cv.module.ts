import { Module } from '@nestjs/common';
import { CvResolver } from './cv.resolver';
import { CVService } from './cv.service';
import { UserService } from '@/user/user.service';
import { SkillService } from '@/skill/skill.service';

@Module({
  providers: [CvResolver, CVService, UserService, SkillService],
})
export class CvModule {}