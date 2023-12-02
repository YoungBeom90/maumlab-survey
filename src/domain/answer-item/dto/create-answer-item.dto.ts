import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnswerItemDto {
  @IsNotEmpty() @IsNumber() questionId: number;
  @IsNotEmpty() @IsNumber() choiceId: number;
}
