import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { AnswerService } from 'src/domain/survey/answer/answer.service';
import { AnswerController } from 'src/domain/survey/answer/answer.controller';

@Module({
  imports: [EntityModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
