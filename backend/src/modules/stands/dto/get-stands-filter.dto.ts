import { IsOptional, IsString } from 'class-validator';

export class GetStandsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
