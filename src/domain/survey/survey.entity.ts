import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from 'src/domain/survey/question/question.entity';
import { Answer } from 'src/domain/survey/answer/answer.entity';
import { CreateSurveyDto } from 'src/domain/survey/dto/create-survey.dto';
import { isNotEmpty } from 'class-validator';
import { UpdateSurveyDto } from 'src/domain/survey/dto/update-survey.dto';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  surveyCode: string;

  @Column({ length: 45 })
  surveyName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Question, (q) => q.survey, {
    cascade: true,
    eager: true,
  })
  questions: Question[];

  @OneToMany(() => Answer, (a) => a.survey)
  answers: Answer[];

  static create(dto: CreateSurveyDto) {
    const entity = new Survey();
    entity.surveyCode = dto.surveyCode;
    entity.surveyName = dto.surveyName;
    if (isNotEmpty(dto.questions) && dto.questions.length) {
      entity.questions = dto.questions.map((qDto) => Question.create(qDto));
    }
    return entity;
  }

  update(dto: UpdateSurveyDto) {
    this.surveyCode = dto.surveyCode;
    this.surveyName = dto.surveyName;
    return this;
  }
}
