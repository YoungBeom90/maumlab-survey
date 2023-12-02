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
import { ChoiceService } from 'src/domain/choice/choice.service';
import { UpdateChoiceDto } from 'src/domain/choice/dto/update-choice.dto';
import { ChoiceResponseDto } from 'src/domain/choice/dto/choice-response.dto';
import { CreateChoiceDto } from 'src/domain/choice/dto/create-choice.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Controller('choices')
export class ChoiceController {
  constructor(private choiceService: ChoiceService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const choice = await this.choiceService.findOneById(id);
    if (isNil(choice)) return;
    return ChoiceResponseDto.from(choice);
  }

  @Post()
  async create(@Body() dto: CreateChoiceDto) {
    await this.choiceService.create(dto);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChoiceDto,
  ) {
    await this.choiceService.updateById(id, dto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    await this.choiceService.deleteById(id);
  }
}
