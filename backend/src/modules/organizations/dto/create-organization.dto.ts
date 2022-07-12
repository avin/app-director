import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;
}
