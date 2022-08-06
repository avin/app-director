import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateApplicationCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}
