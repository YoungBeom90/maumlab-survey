import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/domain/answer/answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from 'src/domain/answer/dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async findOneById(id: number) {
    return await this.answerRepository.findOneBy({ id });
  }

  async findAll() {
    const result = await this.answerRepository.find();
    console.log(result);
  }

  async create(dto: CreateAnswerDto) {
    await this.answerRepository.save(Answer.create(dto));
  }
}
