import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  properties?: Record<string, unknown>;

  @IsString()
  applicationCategoryId: string;
}
