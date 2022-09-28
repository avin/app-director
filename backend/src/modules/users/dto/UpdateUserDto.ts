import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsOptional()
  properties?: Record<string, unknown>;
}
