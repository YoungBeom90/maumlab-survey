import { Choice } from 'src/domain/choice/choice.entity';

export class ChoiceResponseDto {
  id: number;
  sequence: number;
  content: string;

  static from(choice: Choice) {
    const dto = new ChoiceResponseDto();
    dto.id = choice.id;
    dto.sequence = choice.sequence;
    dto.content = choice.content;
    return dto;
  }
}
