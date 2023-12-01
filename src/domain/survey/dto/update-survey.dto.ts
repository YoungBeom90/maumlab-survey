import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSurveyDto {
  @IsNotEmpty()
  @IsString()
  surveyCode: string;

  @IsNotEmpty()
  @IsString()
  surveyName: string;
}
