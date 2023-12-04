import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { precondition } from 'src/util/precondition';
import {
  DefaultServerException,
  QueryFailedException,
} from 'src/util/exceptions';
import { Question } from 'src/domain/question/question.entity';
import { ChoiceService } from 'src/domain/choice/choice.service';
import { UpdateQuestionDto } from 'src/domain/question/dto/update-question.dto';
import { CreateQuestionDto } from 'src/domain/question/dto/create-question.dto';

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

  async findOneWithChildrenById(id: number) {
    return await this.questionRepository.findOne({
      relations: ['choices'],
      where: { id },
    });
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

  async create(dto: CreateQuestionDto) {
    const foundQuestion = await this.questionRepository.findOneBy({
      surveyId: dto.surveyId,
      sequence: dto.sequence,
    });
    precondition(
      !foundQuestion,
      HttpStatus.CONFLICT,
      'Already exists question sequence by survey id.',
    );
    await this.save(Question.create(dto));
  }

  async updateById(id: number, dto: UpdateQuestionDto) {
    const question = await this.findOneById(id);
    precondition(question, HttpStatus.NOT_FOUND, 'Not found question by id');
    await this.save(question.update(dto));
  }

  async deleteById(id: number) {
    const question = await this.findOneWithChildrenById(id);
    precondition(question, HttpStatus.NOT_FOUND, 'Not found question by id');

    try {
      if (question.choices && question.choices.length) {
        await this.deleteAll([question]);
        return;
      }
      await this.questionRepository.remove(question);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async deleteAll(questions: Question[]) {
    try {
      await Promise.all(
        questions.map(async (question) => {
          if (question.choices && question.choices.length) {
            await this.choiceService.deleteAll(question.choices);
          }
        }),
      );
      await this.questionRepository.remove(questions);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }
}
