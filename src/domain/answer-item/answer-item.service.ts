import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerItem } from 'src/domain/entities';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateAnswerItemDto } from 'src/domain/answer-item/dto/update-answer-item.dto';
import {
  DefaultServerException,
  QueryFailedException,
} from 'src/util/exceptions';
import { precondition } from 'src/util/precondition';

@Injectable()
export class AnswerItemService {
  constructor(
    @InjectRepository(AnswerItem)
    private answerItemRepository: Repository<AnswerItem>,
  ) {}

  async findOneById(id: number) {
    return await this.answerItemRepository.findOneBy({ id });
  }

  async save(answerItem: AnswerItem) {
    try {
      await this.answerItemRepository.save(answerItem);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async updateById(id: number, dto: UpdateAnswerItemDto) {
    const answerItem = await this.findOneById(id);
    precondition(
      answerItem,
      HttpStatus.NOT_FOUND,
      'Not found answer item by id',
    );
    await this.save(answerItem.update(dto));
  }

  async delete(answerItem: AnswerItem) {
    try {
      await this.answerItemRepository.remove(answerItem);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async deleteAll(answerItems: AnswerItem[]) {
    try {
      await this.answerItemRepository.remove(answerItems);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }
}
