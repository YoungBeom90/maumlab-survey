import { QuestionResponseDto } from 'src/domain/survey/question/dto/question-response.dto';
import { Survey } from 'src/domain/survey/survey.entity';

export class SurveyResponseDto {
  id: number;
  surveyName: string;
  questions: QuestionResponseDto[];

  static from(survey: Survey) {
    const dto = new SurveyResponseDto();
    dto.id = survey.id;
    dto.surveyName = survey.surveyName;
    dto.questions = survey.questions.map((question) =>
      QuestionResponseDto.from(question),
    );
    return dto;
  }
}
