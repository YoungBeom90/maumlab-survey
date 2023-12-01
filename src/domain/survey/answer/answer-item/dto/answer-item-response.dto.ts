import { AnswerItem } from 'src/domain/survey/answer/answer-item/answer-item.entity';

export class AnswerItemResponseDto {
  id: number;
  questionSequence: number;
  questionContent: string;
  choiceSequence: number;
  choiceContent: string;
  choiceScore: number;

  static from(answerItem: AnswerItem) {
    const dto = new AnswerItemResponseDto();
    dto.id = answerItem.id;
    dto.questionSequence = answerItem.question.sequence;
    dto.questionContent = answerItem.question.content;
    dto.choiceSequence = answerItem.choice.sequence;
    dto.choiceContent = answerItem.choice.content;
    dto.choiceScore = answerItem.choice.score;
    return dto;
  }
}
