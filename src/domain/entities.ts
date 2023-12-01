import { Survey } from 'src/domain/survey/survey.entity';
import { Question } from 'src/domain/survey/question/question.entity';
import { Choice } from 'src/domain/survey/question/choice/choice.entity';
import { Answer } from 'src/domain/survey/answer/answer.entity';
import { AnswerItem } from 'src/domain/survey/answer/answer-item/answer-item.entity';

export const ENTITIES = [Survey, Question, Choice, Answer, AnswerItem];
