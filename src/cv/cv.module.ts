import { Module } from '@nestjs/common';
import { CvResolver } from './cv.resolver';
import { CVService } from './cv.service';
import { UserService } from '@/user/user.service';
import { SkillService } from '@/skill/skill.service';
import { GraphqlModule } from '../graphql/graphql.module';
import { CvSubscriptionResolver } from './cvsubscription.resolver';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [GraphqlModule],
  providers: [
    PrismaService,
    CvResolver,
    CVService,
    UserService,
    SkillService,
    CvSubscriptionResolver,
  ],
})
export class CvModule {}
