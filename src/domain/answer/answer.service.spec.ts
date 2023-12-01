import { AnswerService } from 'src/domain/answer/answer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityModule } from 'src/domain/entity.module';

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

  it('findAll', async function () {
    await service.findAll();
  });
});
