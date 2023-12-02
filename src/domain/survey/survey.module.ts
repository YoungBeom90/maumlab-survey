import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { SurveyService } from 'src/domain/survey/survey.service';
import { QuestionModule } from 'src/domain/question/question.module';
import { SurveyController } from 'src/domain/survey/survey.controller';

@Module({
  imports: [EntityModule, QuestionModule],
  controllers: [SurveyController],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}
