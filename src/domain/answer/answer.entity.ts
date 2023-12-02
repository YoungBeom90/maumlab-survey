import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerItem } from 'src/domain/answer-item/answer-item.entity';
import { Survey } from 'src/domain/survey/survey.entity';
import { CreateAnswerDto } from 'src/domain/answer/dto/create-answer.dto';

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
  })
  answerItems: AnswerItem[];

  @ManyToOne(() => Survey, (s) => s.answers)
  survey: Survey;

  static create(dto: CreateAnswerDto) {
    const answer = new Answer();
    answer.surveyId = dto.surveyId;
    if (dto.answerItems && dto.answerItems.length) {
      answer.answerItems = dto.answerItems.map((itemDto) =>
        AnswerItem.create(itemDto),
      );
    }
    return answer;
  }
}
