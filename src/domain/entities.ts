import { Survey } from 'src/domain/survey/survey.entity';
import { Question } from 'src/domain/survey/question/question.entity';
import { Choice } from 'src/domain/survey/choice/choice.entity';
import { Answer } from 'src/domain/answer/answer.entity';
import { AnswerItem } from 'src/domain/answer/answer-item/answer-item.entity';

export const ENTITIES = [Survey, Question, Choice, Answer, AnswerItem];
