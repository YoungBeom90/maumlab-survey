import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/domain/survey/question/question.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateQuestionDto } from 'src/domain/survey/question/dto/update-question.dto';
import { precondition } from 'src/util/precondition';
import {
  DefaultServerException,
  QueryFailedException,
} from 'src/util/exceptions';
import { UpdateChoiceDto } from 'src/domain/survey/choice/dto/update-choice.dto';
import { ChoiceService } from 'src/domain/survey/choice/choice.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private choiceService: ChoiceService,
  ) {}

  async findOneById(id: number) {
    return await this.questionRepository.findOneBy({ id });
  }

  async save(question: Question) {
    try {
      await this.questionRepository.save(question);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async update(id: number, dto: UpdateQuestionDto) {
    const question = await this.findOneById(id);
    precondition(question, HttpStatus.NOT_FOUND, 'Not found question by id');
    await this.save(question.update(dto));
  }

  async updateChoice(id: number, choiceId: number, dto: UpdateChoiceDto) {
    const question = await this.findOneById(id);
    precondition(question, HttpStatus.NOT_FOUND, 'Not found question by id');
    await this.choiceService.update(choiceId, dto);
  }
}
