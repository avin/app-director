import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;
}
