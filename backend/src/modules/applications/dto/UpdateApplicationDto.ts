import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}