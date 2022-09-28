import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsOptional()
  properties?: Record<string, unknown>;

  @IsString()
  @IsOptional()
  applicationCategoryId: string;
}
