import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Choice } from 'src/domain/survey/question/choice/choice.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateChoiceDto } from 'src/domain/survey/question/choice/dto/update-choice.dto';
import { precondition } from 'src/util/precondition';
import {
  DefaultServerException,
  QueryFailedException,
} from 'src/util/exceptions';

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

  async update(id: number, dto: UpdateChoiceDto) {
    const choice = await this.findOneById(id);
    precondition(choice, HttpStatus.NOT_FOUND, 'Not found choice by id');
    await this.save(choice.update(dto));
  }
}
