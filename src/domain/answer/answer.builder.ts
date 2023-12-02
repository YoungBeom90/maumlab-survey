import { Answer } from 'src/domain/answer/answer.entity';

export class AnswerBuilder {
  private answer = new Answer();

  id(value: number) {
    this.answer.id = value;
    return this;
  }

  surveyId(value: number) {
    this.answer.surveyId = value;
    return this;
  }
  createdAt(value: Date = new Date()) {
    this.answer.createdAt = value;
    return this;
  }

  build() {
    return this.answer;
  }
}
