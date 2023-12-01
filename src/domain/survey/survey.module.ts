import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { SurveyService } from 'src/domain/survey/survey.service';
import { QuestionService } from 'src/domain/survey/question/question.service';
import { QuestionModule } from 'src/domain/survey/question/question.module';
import { SurveyController } from 'src/domain/survey/survey.controller';

@Module({
  imports: [EntityModule, QuestionModule],
  controllers: [SurveyController],
  providers: [SurveyService, QuestionService],
  exports: [SurveyService, QuestionModule],
})
export class SurveyModule {}
