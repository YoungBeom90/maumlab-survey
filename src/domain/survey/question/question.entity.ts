import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Choice } from 'src/domain/survey/choice/choice.entity';
import { Survey } from 'src/domain/survey/survey.entity';
import { AnswerItem } from 'src/domain/answer/answer-item/answer-item.entity';
import { CreateQuestionDto } from 'src/domain/survey/question/dto/create-question.dto';
import { isNotEmpty } from 'class-validator';
import { UpdateQuestionDto } from 'src/domain/survey/question/dto/update-question.dto';

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

  @OneToMany(() => Choice, (c) => c.question, { cascade: true, eager: true })
  choices: Choice[];

  @OneToMany(() => AnswerItem, (a) => a.question)
  answerItems: AnswerItem[];

  @ManyToOne(() => Survey, (s) => s.questions)
  survey: Survey;

  static create(dto: CreateQuestionDto) {
    const entity = new Question();
    entity.sequence = dto.sequence;
    entity.content = dto.content;
    if (isNotEmpty(dto.choices) && dto.choices.length) {
      entity.choices = dto.choices.map((cDto) => Choice.create(cDto));
    }
    return entity;
  }

  update(dto: UpdateQuestionDto) {
    this.sequence = dto.sequence;
    this.content = dto.content;
    return this;
  }
}
