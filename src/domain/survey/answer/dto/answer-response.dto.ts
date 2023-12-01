import { AnswerItemResponseDto } from 'src/domain/survey/answer/answer-item/dto/answer-item-response.dto';
import { Answer } from 'src/domain/survey/answer/answer.entity';

export class AnswerResponseDto {
  id: number;
  surveyCode: string;
  surveyName: string;
  totalScore: number;
  answerItems: AnswerItemResponseDto[];

  static from(answer: Answer) {
    const dto = new AnswerResponseDto();
    dto.id = answer.id;
    dto.surveyCode = answer.survey.surveyCode;
    dto.surveyName = answer.survey.surveyName;
    dto.totalScore = 0;
    if (answer.answerItems && answer.answerItems.length) {
      dto.answerItems = answer.answerItems.map((item) =>
        AnswerItemResponseDto.from(item),
      );
      dto.totalScore = answer.answerItems.reduce((prev, curr) => {
        return prev + curr.choice.score;
      }, 0);
    }
    return dto;
  }
}
