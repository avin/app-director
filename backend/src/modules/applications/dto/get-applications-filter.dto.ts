import { IsOptional, IsString } from 'class-validator';

export class GetApplicationsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
