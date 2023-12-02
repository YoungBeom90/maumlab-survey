import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { ChoiceModule } from 'src/domain/choice/choice.module';
import { QuestionService } from 'src/domain/question/question.service';
import { QuestionController } from 'src/domain/question/question.controller';

@Module({
  imports: [EntityModule, ChoiceModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
