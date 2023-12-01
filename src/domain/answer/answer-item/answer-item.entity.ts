import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from 'src/domain/survey/question/question.entity';
import { Choice } from 'src/domain/survey/choice/choice.entity';
import { Answer } from 'src/domain/answer/answer.entity';
import { CreateAnswerItemDto } from 'src/domain/answer/answer-item/dto/create-answer-item.dto';

@Entity()
export class AnswerItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @Column()
  choiceId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Answer, (a) => a.answerItems)
  answer: Answer;

  @ManyToOne(() => Question, (q) => q.answerItems, { eager: true })
  question: Question;

  @ManyToOne(() => Choice, (c) => c.answerItems, { eager: true })
  choice: Choice;

  static create(dto: CreateAnswerItemDto) {
    const answerItem = new AnswerItem();
    answerItem.questionId = dto.questionId;
    answerItem.choiceId = dto.choiceId;
    return answerItem;
  }
}
