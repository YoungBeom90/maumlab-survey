import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Choice } from 'src/domain/survey/question/choice/choice.entity';
import { CreateChoiceDto } from 'src/domain/survey/question/choice/dto/create-choice.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  sequence: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @Type(() => Choice)
  choices: CreateChoiceDto[];
}
