import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';
import { PaginationParams } from '../../../utils/types/PaginationParams';

export class GetApplicationCategoriesFilterDto extends PaginationParams {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString({ each: true })
  ids?: string[];

  @IsOptional()
  orderBy: 'title' | 'createdAt' | 'updatedAt' | 'applicationsCount' = 'title';

  @IsOptional()
  @ValidateIf((o) => !!o.orderBy)
  @IsIn(['DESC', 'ASC'])
  orderDirection: 'DESC' | 'ASC' = 'ASC';
}
