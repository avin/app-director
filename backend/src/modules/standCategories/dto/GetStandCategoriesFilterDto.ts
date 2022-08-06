import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';
import { PaginationParams } from '../../../utils/types/PaginationParams';

export class GetStandCategoriesFilterDto extends PaginationParams {
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
