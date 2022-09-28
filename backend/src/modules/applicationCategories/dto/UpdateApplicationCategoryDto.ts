import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationCategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}
