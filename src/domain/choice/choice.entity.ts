import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from 'src/domain/question/question.entity';
import { AnswerItem } from 'src/domain/answer-item/answer-item.entity';
import { CreateChoiceDto } from 'src/domain/choice/dto/create-choice.dto';
import { UpdateChoiceDto } from 'src/domain/choice/dto/update-choice.dto';

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
    if (dto.questionId) {
      entity.questionId = dto.questionId;
    }
    entity.sequence = dto.sequence;
    entity.content = dto.content;
    entity.score = dto.score;
    return entity;
  }

  update(dto: UpdateChoiceDto) {
    if (dto.sequence) {
      this.sequence = dto.sequence;
    }
    if (dto.content) {
      this.content = dto.content;
    }
    if (dto.score) {
      this.score = dto.score;
    }
    return this;
  }
}
