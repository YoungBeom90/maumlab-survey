import { ChoiceResponseDto } from 'src/domain/survey/choice/dto/choice-response.dto';
import { Question } from 'src/domain/survey/question/question.entity';

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
    dto.choices = question.choices.map((choice) =>
      ChoiceResponseDto.from(choice),
    );
    return dto;
  }
}
