import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Survey } from 'src/domain/survey/survey.entity';
import { CreateSurveyDto } from 'src/domain/survey/dto/create-survey.dto';
import { precondition } from 'src/util/precondition';
import {
  DefaultServerException,
  QueryFailedException,
} from 'src/util/exceptions';
import { UpdateSurveyDto } from 'src/domain/survey/dto/update-survey.dto';
import { UpdateQuestionDto } from 'src/domain/survey/question/dto/update-question.dto';
import { QuestionService } from 'src/domain/survey/question/question.service';
import { UpdateChoiceDto } from 'src/domain/survey/choice/dto/update-choice.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    private questionService: QuestionService,
  ) {}

  async create(dto: CreateSurveyDto) {
    const foundSurvey = await this.surveyRepository.findOneBy({
      surveyCode: dto.surveyCode,
    });
    precondition(
      !foundSurvey,
      HttpStatus.CONFLICT,
      'Already exists survey code.',
    );
    await this.save(Survey.create(dto));
  }

  async save(survey: Survey) {
    try {
      await this.surveyRepository.save(survey);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }

  async findOneById(id: number) {
    return await this.surveyRepository.findOneBy({ id });
  }

  async findOneBySurveyCode(surveyCode: string) {
    return await this.surveyRepository.findOneBy({ surveyCode });
  }

  async findAll() {
    return await this.surveyRepository.find();
  }

  async update(id: number, dto: UpdateSurveyDto) {
    const survey = await this.findOneById(id);
    precondition(survey, HttpStatus.NOT_FOUND, 'Not found survey by id');
    await this.save(survey.update(dto));
  }

  async updateQuestion(id: number, questionId: number, dto: UpdateQuestionDto) {
    const survey = await this.findOneById(id);
    precondition(survey, HttpStatus.NOT_FOUND, 'Not found survey by id');

    await this.questionService.update(questionId, dto);
  }

  async updateChoice(
    id: number,
    questionId: number,
    choiceId: number,
    dto: UpdateChoiceDto,
  ) {
    const survey = await this.findOneById(id);
    precondition(survey, HttpStatus.NOT_FOUND, 'Not found survey by id');
    await this.questionService.updateChoice(questionId, choiceId, dto);
  }
}
