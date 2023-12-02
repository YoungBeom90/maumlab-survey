import { AnswerItem } from 'src/domain/answer-item/answer-item.entity';

export class AnswerItemBuilder {
  private answerItem = new AnswerItem();

  id(value: number) {
    this.answerItem.id = value;
    return this;
  }

  answerId(value: number) {
    this.answerItem.answerId = value;
    return this;
  }

  questionId(value: number) {
    this.answerItem.questionId = value;
    return this;
  }

  choiceId(value: number) {
    this.answerItem.choiceId = value;
    return this;
  }

  createdAt(value: Date = new Date()) {
    this.answerItem.createdAt = value;
    return this;
  }

  updatedAt(value: Date = new Date()) {
    this.answerItem.updatedAt = value;
    return this;
  }

  build() {
    return this.answerItem;
  }
}
