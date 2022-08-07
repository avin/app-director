import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';
import { PaginationParams } from '../../../utils/types/PaginationParams';

export class GetApplicationsFilterDto extends PaginationParams {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString({ each: true })
  ids?: string[];

  @IsOptional()
  @IsString()
  applicationCategoryId?: string;

  @IsOptional()
  orderBy: 'title' | 'description' | 'createdAt' | 'updatedAt' | 'applicationCategory' | 'standsCount' = 'title';

  @IsOptional()
  @ValidateIf((o) => !!o.orderBy)
  @IsIn(['DESC', 'ASC'])
  orderDirection: 'DESC' | 'ASC' = 'ASC';
}
