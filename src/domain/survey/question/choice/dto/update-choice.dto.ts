import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateChoiceDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  sequence: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @MaxLength(3)
  score: number;
}
