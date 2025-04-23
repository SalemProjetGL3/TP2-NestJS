import { Module } from '@nestjs/common';
import { CvResolver } from './cv.resolver';

@Module({
  providers: [CvResolver],
})
export class CvModule {}