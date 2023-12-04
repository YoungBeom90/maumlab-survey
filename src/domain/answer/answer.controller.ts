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
import { isNil } from '@nestjs/common/utils/shared.utils';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {} ///

  /**
   * 아이디로 조회
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const answer = await this.answerService.findOneByIdWithRelations(id);
    if (isNil(answer)) {
      return;
    }
    return AnswerResponseDto.from(answer);
  }

  /**
   * 모든 답변 조회
   */
  @Get()
  async findAllWithRelations() {
    const answers = await this.answerService.findAllWithRelations();
    return answers.map((answer) => AnswerResponseDto.from(answer));
  }

  /**
   * 답변 생성
   * @param dto
   */
  @Post()
  async create(@Body() dto: CreateAnswerDto) {
    console.log(dto.answerItems);
    const answer = await this.answerService.create(dto);
    return {
      answerId: answer.id,
    };
  }

  /**
   * 답변 항목 수정
   * @param id
   * @param answerItemId
   * @param dto
   */
  @Patch(':id/answer-item/:answerItemId')
  async updateAnswerItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('answerItemId') answerItemId: number,
    @Body() dto: UpdateAnswerItemDto,
  ) {
    await this.answerService.updateAnswerItem(id, answerItemId, dto);
  }

  /**
   * 답변 삭제
   * @param id
   */
  @Delete(':id')
  async deleteWithChildren(@Param('id', ParseIntPipe) id: number) {
    await this.answerService.deleteWithChildren(id);
  }

  /**
   * 답변 항목 삭제 (설문지중 1개의 답변 삭제 시 사용)
   * @param id
   * @param answerItemId
   */
  @Delete(':id/answer-item/:answerItemId')
  async deleteAnswerItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('answerItemId', ParseIntPipe) answerItemId: number,
  ) {
    await this.answerService.deleteAnswerItem(id, answerItemId);
  }
}
