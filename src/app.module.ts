import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [GraphqlModule, CvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
