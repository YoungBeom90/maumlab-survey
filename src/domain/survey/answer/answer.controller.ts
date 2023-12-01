import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AnswerService } from 'src/domain/survey/answer/answer.service';
import { AnswerResponseDto } from 'src/domain/survey/answer/dto/answer-response.dto';
import { CreateAnswerDto } from 'src/domain/survey/answer/dto/create-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.answerService.findOneById(id);
    return AnswerResponseDto.from(result);
  }

  @Post()
  async create(@Body() dto: CreateAnswerDto) {
    await this.answerService.create(dto);
  }
}
