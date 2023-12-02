import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from 'src/domain/question/question.entity';
import { Choice } from 'src/domain/choice/choice.entity';
import { Answer } from 'src/domain/answer/answer.entity';
import { CreateAnswerItemDto } from 'src/domain/answer-item/dto/create-answer-item.dto';
import { UpdateAnswerItemDto } from 'src/domain/answer-item/dto/update-answer-item.dto';

@Entity()
export class AnswerItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answerId: number;

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

  @ManyToOne(() => Question, (q) => q.answerItems)
  question: Question;

  @ManyToOne(() => Choice, (c) => c.answerItems)
  choice: Choice;

  static create(dto: CreateAnswerItemDto) {
    const answerItem = new AnswerItem();
    answerItem.questionId = dto.questionId;
    answerItem.choiceId = dto.choiceId;
    return answerItem;
  }

  update(dto: UpdateAnswerItemDto) {
    this.questionId = dto.questionId;
    this.choiceId = dto.choiceId;
    return this;
  }
}
