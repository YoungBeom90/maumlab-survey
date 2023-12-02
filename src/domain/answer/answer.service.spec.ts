import { AnswerService } from 'src/domain/answer/answer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityModule } from 'src/domain/entity.module';
import { AnswerBuilder } from 'src/domain/answer/answer.builder';
import { AnswerItemBuilder } from 'src/domain/answer-item/answer-item.builder';

describe('AnswerServiceTest', function () {
  let service: AnswerService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [EntityModule],
      providers: [AnswerService],
    }).compile();

    service = module.get(AnswerService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('findAll', async function () {
    await service.findAllWithRelations();
  });

  it('createAnswerTest', async function () {
    const answer = new AnswerBuilder().id(1).surveyId(1).createdAt().build();
    const answerItem = new AnswerItemBuilder()
      .answerId(1)
      .questionId(1)
      .choiceId(1)
      .createdAt()
      .build();

    answer.answerItems.push(answerItem);

    await service.create(answer);
  });
});
