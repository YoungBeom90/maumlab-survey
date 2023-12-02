import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { ChoiceService } from 'src/domain/choice/choice.service';
import { ChoiceController } from 'src/domain/choice/choice.controller';

@Module({
  imports: [EntityModule],
  controllers: [ChoiceController],
  providers: [ChoiceService],
  exports: [ChoiceService],
})
export class ChoiceModule {}
