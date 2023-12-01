import { IsNotEmpty } from 'class-validator';
import { CreateAnswerItemDto } from 'src/domain/survey/answer/answer-item/dto/create-answer-item.dto';

export class CreateAnswerDto {
  @IsNotEmpty()
  surveyId: number;

  @IsNotEmpty({ each: true })
  answerItems: CreateAnswerItemDto[];
}
