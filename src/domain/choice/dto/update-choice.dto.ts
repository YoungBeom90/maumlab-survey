import { IsNumber, IsString } from 'class-validator';

export class UpdateChoiceDto {
  @IsNumber() sequence: number;
  @IsString() content: string;
  @IsNumber() score: number;
}
