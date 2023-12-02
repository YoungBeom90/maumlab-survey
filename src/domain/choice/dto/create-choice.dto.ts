import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChoiceDto {
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsNumber()
  sequence: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
