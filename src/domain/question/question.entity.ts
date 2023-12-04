import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Choice } from 'src/domain/choice/choice.entity';
import { Survey } from 'src/domain/survey/survey.entity';
import { AnswerItem } from 'src/domain/answer-item/answer-item.entity';
import { CreateQuestionDto } from 'src/domain/question/dto/create-question.dto';
import { UpdateQuestionDto } from 'src/domain/question/dto/update-question.dto';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surveyId: number;

  @Column()
  sequence: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Choice, (c) => c.question, { cascade: true })
  choices: Choice[];

  @OneToMany(() => AnswerItem, (a) => a.question)
  answerItems: AnswerItem[];

  @ManyToOne(() => Survey, (s) => s.questions)
  survey: Survey;

  static create(dto: CreateQuestionDto) {
    const entity = new Question();
    if (dto.surveyId) {
      entity.surveyId = dto.surveyId;
    }
    entity.sequence = dto.sequence;
    entity.content = dto.content;
    if (dto.choices && dto.choices.length) {
      entity.choices = dto.choices.map((cDto) => Choice.create(cDto));
    }
    return entity;
  }

  update(dto: UpdateQuestionDto) {
    if (dto.sequence) {
      this.sequence = dto.sequence;
    }

    if (dto.content) {
      this.content = dto.content;
    }
    return this;
  }
}
