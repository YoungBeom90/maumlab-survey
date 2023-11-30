import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { maumlabDb } from 'src/config/db-connection-config';
import { SurveyModule } from 'src/domain/survey/survey.module';

@Module({
  imports: [TypeOrmModule.forRoot(maumlabDb), SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
