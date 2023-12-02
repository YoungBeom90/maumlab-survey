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
import { AnswerService } from 'src/domain/answer/answer.service';
import { AnswerResponseDto } from 'src/domain/answer/dto/answer-response.dto';
import { CreateAnswerDto } from 'src/domain/answer/dto/create-answer.dto';
import { UpdateAnswerItemDto } from 'src/domain/answer-item/dto/update-answer-item.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {} ///

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const answer = await this.answerService.findOneByIdWithRelations(id);
    return AnswerResponseDto.from(answer);
  }

  @Get()
  async findAllWithRelations() {
    const answers = await this.answerService.findAllWithRelations();
    return answers.map((answer) => AnswerResponseDto.from(answer));
  }

  @Post()
  async create(@Body() dto: CreateAnswerDto) {
    console.log(dto.answerItems);
    const answer = await this.answerService.create(dto);
    return {
      answerId: answer.id,
    };
  }

  @Patch(':id/answer-item/:answerItemId')
  async updateAnswerItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('answerItemId') answerItemId: number,
    @Body() dto: UpdateAnswerItemDto,
  ) {
    await this.answerService.updateAnswerItem(id, answerItemId, dto);
  }

  @Delete(':id')
  async deleteWithChildren(@Param('id', ParseIntPipe) id: number) {
    await this.answerService.deleteWithChildren(id);
  }

  @Delete(':id/answer-item/:answerItemId')
  async deleteAnswerItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('answerItemId', ParseIntPipe) answerItemId: number,
  ) {
    await this.answerService.deleteAnswerItem(id, answerItemId);
  }
}
