import { SurveyService } from 'src/domain/survey/survey.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SurveyModule } from 'src/domain/survey/survey.module';
import { EntityModule } from 'src/domain/entity.module';
import { SurveyBuilder } from 'src/domain/survey/survey.builder';

describe('SurveyServiceTest', () => {
  let service: SurveyService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [EntityModule, SurveyModule],
    }).compile();

    service = module.get(SurveyService);
  });

  it('insert', async function () {
    const builder = new SurveyBuilder();
    const mock = builder.surveyName('A 설문조사').createdAt().build();
    await service.insert(mock);
  });

  it('findAllSurvey', async function () {
    await service.findAllSurvey();
  });
});
