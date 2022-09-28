import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStandCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}
