import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';

export class GetStandsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['title', 'description', 'createdAt', 'updatedAt'])
  orderBy: 'title' | 'description' | 'createdAt' | 'updatedAt' = 'title';

  @IsOptional()
  @ValidateIf((o) => !!o.orderBy)
  @IsIn(['DESC', 'ASC'])
  orderDirection: 'DESC' | 'ASC' = 'ASC';
}
