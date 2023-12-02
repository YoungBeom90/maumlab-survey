import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { AnswerService } from 'src/domain/answer/answer.service';
import { AnswerController } from 'src/domain/answer/answer.controller';
import { AnswerItemService } from 'src/domain/answer-item/answer-item.service';

@Module({
  imports: [EntityModule],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerItemService],
  exports: [AnswerService, AnswerItemService],
})
export class AnswerModule {}
