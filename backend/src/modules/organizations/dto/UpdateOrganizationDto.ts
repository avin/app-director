import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}
