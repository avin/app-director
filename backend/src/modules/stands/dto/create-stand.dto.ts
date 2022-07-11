import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStandDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  applicationId: string;
}
