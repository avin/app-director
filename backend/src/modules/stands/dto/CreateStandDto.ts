import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStandDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  standCategoryId: string;

  @IsString()
  applicationId: string;

  @IsOptional()
  @IsString()
  organizationId?: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}
