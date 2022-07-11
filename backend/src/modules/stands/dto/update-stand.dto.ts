import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStandDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  applicationId?: string;

  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}
