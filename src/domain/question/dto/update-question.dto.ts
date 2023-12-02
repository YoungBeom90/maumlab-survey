import { UpdateChoiceDto } from 'src/domain/choice/dto/update-choice.dto';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateQuestionDto {
  @IsNumber()
  sequence: number;

  @IsString()
  content: string;

  @Type(() => UpdateChoiceDto)
  choices: UpdateChoiceDto[];
}
