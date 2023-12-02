import { CreateQuestionDto } from 'src/domain/question/dto/create-question.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSurveyDto {
  @IsNotEmpty()
  @IsString()
  surveyCode: string;

  @IsNotEmpty()
  @IsString()
  surveyName: string;

  @IsNotEmpty({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
