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
import { UpdateQuestionDto } from 'src/domain/survey/question/dto/update-question.dto';
import { UpdateChoiceDto } from 'src/domain/survey/choice/dto/update-choice.dto';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get(':code/code')
  async findOneBySurveyCode(@Param('code') code: string) {
    const survey = await this.surveyService.findOneBySurveyCode(code);
    if (isNil(survey)) return null;
    return SurveyResponseDto.from(survey);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const survey = await this.surveyService.findOneById(id);
    if (isNil(survey)) return null;
    return SurveyResponseDto.from(survey);
  }

  @Get()
  async findAll() {
    const surveys = await this.surveyService.findAll();
    return surveys.map((survey) => SurveyResponseDto.from(survey));
  }

  @Post()
  async createSurvey(@Body() dto: CreateSurveyDto) {
    await this.surveyService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSurveyDto,
  ) {
    await this.surveyService.update(id, dto);
  }

  @Patch(':id/question/:questionId')
  async updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() dto: UpdateQuestionDto,
  ) {
    await this.surveyService.updateQuestion(id, questionId, dto);
  }

  @Patch(':id/question/:questionId/choice/:choiceId')
  async updateChoice(
    @Param('id', ParseIntPipe) id: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Param('choiceId', ParseIntPipe) choiceId: number,
    @Body() dto: UpdateChoiceDto,
  ) {
    await this.surveyService.updateChoice(id, questionId, choiceId, dto);
  }

  // todo
  @Delete()
  async delete() {}

  // todo
  @Delete()
  async deleteQuestion() {}

  // todo
  @Delete()
  async deleteChoice() {}
}
