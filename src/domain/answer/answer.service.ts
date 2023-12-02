import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/domain/answer/answer.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAnswerDto } from 'src/domain/answer/dto/create-answer.dto';
import { UpdateAnswerItemDto } from 'src/domain/answer-item/dto/update-answer-item.dto';
import { precondition } from 'src/util/precondition';
import { AnswerItemService } from 'src/domain/answer-item/answer-item.service';
import {
  DefaultServerException,
  QueryFailedException,
} from 'src/util/exceptions';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private answerItemService: AnswerItemService,
  ) {}

  async findOneById(id: number) {
    return await this.answerRepository.findOneBy({ id });
  }

  async findOneByIdWithChildren(id: number) {
    return await this.answerRepository.findOne({
      relations: ['answerItems'],
      where: { id },
    });
  }

  async findOneByIdWithRelations(id: number) {
    return await this.answerRepository.findOne({
      relations: [
        'answerItems',
        'answerItems.question',
        'answerItems.choice',
        'survey',
      ],
      where: { id },
    });
  }

  async findAllWithRelations() {
    return await this.answerRepository.find({
      relations: [
        'answerItems',
        'answerItems.question',
        'answerItems.choice',
        'answer.survey',
      ],
    });
  }

  async save(answer: Answer) {
    try {
      return await this.answerRepository.save(answer);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async create(dto: CreateAnswerDto) {
    return await this.save(Answer.create(dto));
  }

  async updateAnswerItem(
    id: number,
    answerItemId: number,
    dto: UpdateAnswerItemDto,
  ) {
    const answer = await this.findOneById(id);
    precondition(answer, HttpStatus.NOT_FOUND, 'Not found answer by id');
    await this.answerItemService.updateById(answerItemId, dto);
  }

  async deleteWithChildren(id: number) {
    const answer = await this.findOneByIdWithChildren(id);
    precondition(answer, HttpStatus.NOT_FOUND, 'Not found answer by id');

    try {
      if (answer.answerItems && answer.answerItems.length) {
        await this.answerItemService.deleteAll(answer.answerItems);
      }
      await this.answerRepository.remove(answer);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async deleteAnswerItem(id: number, answerItemId: number) {
    const answer = await this.findOneByIdWithChildren(id);
    precondition(answer, HttpStatus.NOT_FOUND, 'Not found answer by id');

    const answerItem = answer.answerItems.find(
      (answerItem) => answerItem.id === answerItemId,
    );
    precondition(
      answerItem,
      HttpStatus.NOT_FOUND,
      'Not found answer item by id',
    );

    await this.answerItemService.delete(answerItem);
  }
}
