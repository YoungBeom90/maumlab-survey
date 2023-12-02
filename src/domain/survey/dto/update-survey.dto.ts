import { IsString } from 'class-validator';

export class UpdateSurveyDto {
  @IsString() surveyCode: string;
  @IsString() surveyName: string;
}
