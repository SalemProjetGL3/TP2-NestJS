import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { CvModule } from './cv/cv.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [GraphqlModule, CvModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
