import { Survey } from 'src/domain/survey/survey.entity';

export class SurveyBuilder {
  private survey = new Survey();

  id(value: number) {
    this.survey.id = value;
    return this;
  }

  surveyCode(value: string) {
    this.survey.surveyCode = value;
    return this;
  }

  surveyName(value: string) {
    this.survey.surveyName = value;
    return this;
  }

  createdAt(value: Date = new Date()) {
    this.survey.createdAt = value;
    return this;
  }

  updatedAt(value: Date = new Date()) {
    this.survey.updatedAt = value;
    return this;
  }

  build() {
    return this.survey;
  }
}
