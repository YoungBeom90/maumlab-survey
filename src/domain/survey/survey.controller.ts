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
import { SurveyService } from 'src/domain/survey/survey.service';
import { CreateSurveyDto } from 'src/domain/survey/dto/create-survey.dto';
import { UpdateSurveyDto } from 'src/domain/survey/dto/update-survey.dto';
import { SurveyResponseDto } from 'src/domain/survey/dto/survey-response.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get(':code/code')
  async findOneBySurveyCodeWithRelations(@Param('code') code: string) {
    const survey =
      await this.surveyService.findOneBySurveyCodeWithRelations(code);
    if (isNil(survey)) return null;
    return SurveyResponseDto.from(survey);
  }

  @Get(':id')
  async findOneByIdWithRelations(@Param('id', ParseIntPipe) id: number) {
    const survey = await this.surveyService.findOneByIdWithRelations(id);
    if (isNil(survey)) return null;
    return SurveyResponseDto.from(survey);
  }

  @Get()
  async findAll() {
    const surveys = await this.surveyService.findAll();
    return surveys.map((survey) => SurveyResponseDto.from(survey));
  }

  @Post()
  async create(@Body() dto: CreateSurveyDto) {
    await this.surveyService.create(dto);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSurveyDto,
  ) {
    await this.surveyService.updateById(id, dto);
  }

  @Delete(':id')
  async deleteWithChildren(@Param('id') id: number) {
    await this.surveyService.deleteWithChildren(id);
  }
}
