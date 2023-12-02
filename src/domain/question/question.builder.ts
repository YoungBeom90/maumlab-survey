import { Question } from 'src/domain/question/question.entity';

export class QuestionBuilder {
  private question = new Question();

  id(value: number) {
    this.question.id = value;
    return this;
  }

  surveyId(value: number) {
    this.question.surveyId = value;
    return this;
  }

  sequence(value: number) {
    this.question.sequence = value;
    return this;
  }

  content(value: string) {
    this.question.content = value;
    return this;
  }

  createdAt(value: Date = new Date()) {
    this.question.createdAt = value;
    return this;
  }

  updatedAt(value: Date = new Date()) {
    this.question.updatedAt = value;
    return this;
  }

  build() {
    return this.question;
  }
}
