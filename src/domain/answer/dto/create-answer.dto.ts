import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAnswerItemDto } from 'src/domain/answer-item/dto/create-answer-item.dto';
import { Type } from 'class-transformer';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  surveyId: number;

  @IsNotEmpty({ each: true })
  @Type(() => CreateAnswerItemDto)
  answerItems: CreateAnswerItemDto[];
}
