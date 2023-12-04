import { ChoiceResponseDto } from 'src/domain/choice/dto/choice-response.dto';
import { Question } from 'src/domain/question/question.entity';

export class QuestionResponseDto {
  id: number;
  sequence: number;
  content: string;
  choices: ChoiceResponseDto[];

  static from(question: Question) {
    const dto = new QuestionResponseDto();
    dto.id = question.id;
    dto.sequence = question.sequence;
    dto.content = question.content;
    if (question.choices && question.choices.length) {
      dto.choices = question.choices.map((choice) =>
        ChoiceResponseDto.from(choice),
      );
    }
    return dto;
  }
}
