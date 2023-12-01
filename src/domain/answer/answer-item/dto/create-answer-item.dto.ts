import { IsNotEmpty } from 'class-validator';

export class CreateAnswerItemDto {
  @IsNotEmpty() questionId: number;
  @IsNotEmpty() choiceId: number;
}
