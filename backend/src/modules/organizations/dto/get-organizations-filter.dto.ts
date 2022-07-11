import { IsOptional, IsString } from 'class-validator';

export class GetOrganizationsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
