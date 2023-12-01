import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerItem } from 'src/domain/survey/answer/answer-item/answer-item.entity';
import { Survey } from 'src/domain/survey/survey.entity';
import { CreateAnswerDto } from 'src/domain/survey/answer/dto/create-answer.dto';
import { isNotEmpty } from 'class-validator';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surveyId: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => AnswerItem, (ai) => ai.answer, {
    cascade: true,
    eager: true,
  })
  answerItems: AnswerItem[];

  @ManyToOne(() => Survey, (s) => s.answers, { eager: true })
  survey: Survey;

  static create(dto: CreateAnswerDto) {
    const answer = new Answer();
    answer.surveyId = dto.surveyId;
    if (isNotEmpty(answer.answerItems) && answer.answerItems.length) {
      answer.answerItems = dto.answerItems.map((itemDto) =>
        AnswerItem.create(itemDto),
      );
    }
    return answer;
  }
}
