import { IsNotEmpty, IsOptional } from 'class-validator';
import { UpdateChoiceDto } from 'src/domain/survey/choice/dto/update-choice.dto';

export class UpdateQuestionDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  sequence: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  choices: UpdateChoiceDto[];
}
