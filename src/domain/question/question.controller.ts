import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { QuestionService } from 'src/domain/question/question.service';
import { UpdateQuestionDto } from 'src/domain/question/dto/update-question.dto';
import { QuestionResponseDto } from 'src/domain/question/dto/question-response.dto';
import { CreateQuestionDto } from 'src/domain/question/dto/create-question.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const question = await this.questionService.findOneById(id);
    if (isNil(question)) return;
    return QuestionResponseDto.from(question);
  }

  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    await this.questionService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuestionDto,
  ) {
    await this.questionService.updateById(id, dto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    await this.questionService.deleteById(id);
  }
}
