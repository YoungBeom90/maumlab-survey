import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { QuestionService } from 'src/domain/survey/question/question.service';
import { ChoiceService } from 'src/domain/survey/choice/choice.service';

@Module({
  imports: [EntityModule],
  providers: [QuestionService, ChoiceService],
  exports: [QuestionService, ChoiceService],
})
export class QuestionModule {}
