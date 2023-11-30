import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from 'src/domain/survey/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async insert(survey: Survey) {
    await this.surveyRepository.insert(survey);
  }

  async findAllSurvey() {
    const result = await this.surveyRepository.find();
    console.log(result);
  }
}
