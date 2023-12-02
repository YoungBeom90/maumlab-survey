import { Choice } from 'src/domain/choice/choice.entity';

export class ChoiceBuilder {
  private choice = new Choice();

  id(value: number) {
    this.choice.id = value;
    return this;
  }

  questionId(value: number) {
    this.choice.questionId = value;
    return this;
  }

  sequence(value: number) {
    this.choice.sequence = value;
    return this;
  }

  content(value: string) {
    this.choice.content = value;
    return this;
  }

  score(value: number) {
    this.choice.score = value;
    return this;
  }

  createdAt(value: Date = new Date()) {
    this.choice.createdAt = value;
    return this;
  }

  updatedAt(value: Date = new Date()) {
    this.choice.updatedAt = value;
    return this;
  }

  build() {
    return this.choice;
  }
}
