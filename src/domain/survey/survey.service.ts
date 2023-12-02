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
import { QuestionService } from 'src/domain/question/question.service';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    private questionService: QuestionService,
  ) {}

  async findOneById(id: number) {
    return await this.surveyRepository.findOneBy({ id });
  }

  async findOneByIdWithRelations(id: number) {
    return await this.surveyRepository.findOne({
      relations: ['questions', 'questions.choices'],
      where: { id },
    });
  }

  async findOneBySurveyCodeWithRelations(surveyCode: string) {
    return await this.surveyRepository.findOne({
      relations: ['questions', 'questions.choices'],
      where: { surveyCode },
    });
  }

  async findAll() {
    return await this.surveyRepository.find();
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

  async updateById(id: number, dto: UpdateSurveyDto) {
    const survey = await this.findOneById(id);
    precondition(survey, HttpStatus.NOT_FOUND, 'Not found survey by id');
    await this.save(survey.update(dto));
  }

  async deleteWithChildren(id: number) {
    const survey = await this.findOneByIdWithRelations(id);
    precondition(survey, HttpStatus.NOT_FOUND, 'Not found survey by id');

    try {
      if (survey.questions && survey.questions.length) {
        await this.questionService.deleteAll(survey.questions);
      }
      await this.surveyRepository.remove(survey);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        console.log('@@@ QueryFailedError!!');
        QueryFailedException(e.query, e.message);
      }
      DefaultServerException(e.message);
    }
  }
}
