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

  /**
   * 코드로 설문지 조회.
   * @param code
   */
  @Get(':code/code')
  async findOneBySurveyCodeWithRelations(@Param('code') code: string) {
    const survey =
      await this.surveyService.findOneBySurveyCodeWithRelations(code);
    if (isNil(survey)) return null;
    return SurveyResponseDto.from(survey);
  }

  /**
   * 아이디로 설문지 및 하위 모든 정보 조회.
   * @param id
   */
  @Get(':id')
  async findOneByIdWithRelations(@Param('id', ParseIntPipe) id: number) {
    const survey = await this.surveyService.findOneByIdWithRelations(id);
    if (isNil(survey)) return null;
    return SurveyResponseDto.from(survey);
  }

  /**
   * 모든 설문지 조회.
   */
  @Get()
  async findAll() {
    const surveys = await this.surveyService.findAll();
    return surveys.map((survey) => SurveyResponseDto.from(survey));
  }

  /**
   * 설문지, 문항, 선택지 일괄 생성. (설문지만 생성 가능)
   * @param dto
   */
  @Post()
  async create(@Body() dto: CreateSurveyDto) {
    await this.surveyService.create(dto);
  }

  /**
   * 설문지 수정. (이름, 코드)
   * @param id
   * @param dto
   */
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSurveyDto,
  ) {
    await this.surveyService.updateById(id, dto);
  }

  /**
   * 설문지 삭제. (하위 모든정보 포함 삭제)
   * @param id
   */
  @Delete(':id')
  async deleteWithChildren(@Param('id') id: number) {
    await this.surveyService.deleteWithChildren(id);
  }
}
