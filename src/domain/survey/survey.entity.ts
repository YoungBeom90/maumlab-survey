import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from 'src/domain/question/question.entity';
import { Answer } from 'src/domain/answer/answer.entity';
import { CreateSurveyDto } from 'src/domain/survey/dto/create-survey.dto';
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
  })
  questions: Question[];

  @OneToMany(() => Answer, (a) => a.survey)
  answers: Answer[];

  static create(dto: CreateSurveyDto) {
    const entity = new Survey();
    entity.surveyCode = dto.surveyCode;
    entity.surveyName = dto.surveyName;
    if (dto.questions && dto.questions.length) {
      entity.questions = dto.questions.map((qDto) => Question.create(qDto));
    }
    return entity;
  }

  update(dto: UpdateSurveyDto) {
    if (dto.surveyCode) {
      this.surveyCode = dto.surveyCode;
    }
    if (dto.surveyName) {
      this.surveyName = dto.surveyName;
    }
    return this;
  }
}
