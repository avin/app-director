import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';
import { PaginationParams } from '../../../utils/types/PaginationParams';

export class GetStandsFilterDto extends PaginationParams {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  applicationId?: string;

  @IsOptional()
  @IsString()
  organizationId?: string;

  @IsOptional()
  @IsIn(['title', 'description', 'createdAt', 'updatedAt'])
  orderBy: 'title' | 'description' | 'createdAt' | 'updatedAt' = 'title';

  @IsOptional()
  @ValidateIf((o) => !!o.orderBy)
  @IsIn(['DESC', 'ASC'])
  orderDirection: 'DESC' | 'ASC' = 'ASC';
}
