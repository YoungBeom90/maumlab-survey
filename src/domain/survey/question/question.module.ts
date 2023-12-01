import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { QuestionService } from 'src/domain/survey/question/question.service';
import { AnswerService } from 'src/domain/survey/answer/answer.service';
import { ChoiceService } from 'src/domain/survey/question/choice/choice.service';

@Module({
  imports: [EntityModule],
  providers: [QuestionService, ChoiceService, AnswerService],
  exports: [QuestionService, ChoiceService, AnswerService],
})
export class QuestionModule {}
