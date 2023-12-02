import { IsNumber } from 'class-validator';

export class UpdateAnswerItemDto {
  @IsNumber() questionId: number;
  @IsNumber() choiceId: number;
}
