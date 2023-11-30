import { Survey } from 'src/domain/survey/survey.entity';

export class SurveyBuilder {
  private survey = new Survey();

  surveyName(value: string) {
    this.survey.surveyName = value;
    return this;
  }

  createdAt(value: Date = new Date()) {
    this.survey.createdAt = value;
    return this;
  }

  build() {
    return this.survey;
  }
}
