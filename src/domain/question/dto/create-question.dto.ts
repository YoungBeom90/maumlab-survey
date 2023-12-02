import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Choice } from 'src/domain/choice/choice.entity';
import { CreateChoiceDto } from 'src/domain/choice/dto/create-choice.dto';

export class CreateQuestionDto {
  @IsNumber()
  surveyId: number;

  @IsNotEmpty()
  @IsNumber()
  sequence: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty({ each: true })
  @Type(() => Choice)
  choices: CreateChoiceDto[];
}
