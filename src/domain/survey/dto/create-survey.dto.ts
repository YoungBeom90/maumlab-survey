import { CreateQuestionDto } from 'src/domain/survey/question/dto/create-question.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSurveyDto {
  @IsNotEmpty()
  surveyCode: string;

  @IsNotEmpty()
  surveyName: string;

  @IsOptional()
  questions: CreateQuestionDto[];
}
