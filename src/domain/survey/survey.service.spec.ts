import { SurveyService } from 'src/domain/survey/survey.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SurveyModule } from 'src/domain/survey/survey.module';
import { EntityModule } from 'src/domain/entity.module';
import { SurveyBuilder } from 'src/domain/survey/survey.builder';
import { QuestionBuilder } from 'src/domain/question/question.builder';
import { ChoiceBuilder } from 'src/domain/choice/choice.builder';

describe('SurveyServiceTest', () => {
  let service: SurveyService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [EntityModule, SurveyModule],
    }).compile();

    service = module.get(SurveyService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('createSurveyTest', async function () {
    const survey = new SurveyBuilder()
      .id(1)
      .surveyCode('SURVEY_A')
      .surveyName('A 설문조사')
      .createdAt()
      .build();
    const question = new QuestionBuilder()
      .id(1)
      .surveyId(1)
      .sequence(1)
      .content('당신은 다가올 휴가 때 해외 여행을 희망하시나요?')
      .createdAt()
      .build();
    const choice = new ChoiceBuilder()
      .id(1)
      .questionId(1)
      .sequence(1)
      .content('예')
      .score(10)
      .createdAt()
      .build();

    question.choices.push(choice);
    survey.questions.push(question);

    await service.create(survey);
  });

  it('findAllSurvey', async function () {
    await service.findAll();
  });
});
