import { Module } from '@nestjs/common';
import { EntityModule } from 'src/domain/entity.module';
import { SurveyService } from 'src/domain/survey/survey.service';

@Module({
  imports: [EntityModule],
  controllers: [],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}
