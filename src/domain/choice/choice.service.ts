import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Choice } from 'src/domain/choice/choice.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateChoiceDto } from 'src/domain/choice/dto/update-choice.dto';
import { precondition } from 'src/util/precondition';
import {
  DefaultServerException,
  QueryFailedException,
} from 'src/util/exceptions';
import { CreateChoiceDto } from 'src/domain/choice/dto/create-choice.dto';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
  ) {}

  async findOneById(id: number) {
    return await this.choiceRepository.findOneBy({ id });
  }

  async save(choice: Choice) {
    try {
      await this.choiceRepository.save(choice);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async create(dto: CreateChoiceDto) {
    precondition(
      dto.questionId,
      HttpStatus.BAD_REQUEST,
      'Question ID is required.',
    );
    const foundChoice = await this.choiceRepository.findOneBy({
      questionId: dto.questionId,
      sequence: dto.sequence,
    });
    precondition(
      !foundChoice,
      HttpStatus.CONFLICT,
      'Already exist choice sequence by question id',
    );
    await this.save(Choice.create(dto));
  }

  async updateById(id: number, dto: UpdateChoiceDto) {
    const choice = await this.findOneById(id);
    precondition(choice, HttpStatus.NOT_FOUND, 'Not found choice by id');
    await this.save(choice.update(dto));
  }

  async deleteById(id: number) {
    const choice = await this.findOneById(id);
    precondition(choice, HttpStatus.NOT_FOUND, 'Not found choice by id');

    try {
      await this.choiceRepository.remove(choice);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async deleteAll(choices: Choice[]) {
    await this.choiceRepository.remove(choices);
  }
}
