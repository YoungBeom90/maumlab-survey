import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from 'src/domain/survey/question/question.entity';
import { AnswerItem } from 'src/domain/survey/answer/answer-item/answer-item.entity';
import { CreateChoiceDto } from 'src/domain/survey/question/choice/dto/create-choice.dto';
import { UpdateChoiceDto } from 'src/domain/survey/question/choice/dto/update-choice.dto';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @Column()
  sequence: number;

  @Column()
  content: string;

  @Column({ type: 'smallint' })
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Question, (q) => q.choices)
  question: Question;

  @OneToMany(() => AnswerItem, (a) => a.choice)
  answerItems: AnswerItem[];

  static create(dto: CreateChoiceDto) {
    const entity = new Choice();
    entity.sequence = dto.sequence;
    entity.content = dto.content;
    entity.score = dto.score;
    return entity;
  }

  update(dto: UpdateChoiceDto) {
    this.sequence = dto.sequence;
    this.content = dto.content;
    this.score = dto.score;
    return this;
  }
}
