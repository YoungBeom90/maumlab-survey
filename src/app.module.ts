import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { maumlabDb } from 'src/config/db-connection-config';
import { SurveyModule } from 'src/domain/survey/survey.module';
import { AnswerModule } from 'src/domain/answer/answer.module';

@Module({
  imports: [TypeOrmModule.forRoot(maumlabDb), SurveyModule, AnswerModule],
})
export class AppModule {}
