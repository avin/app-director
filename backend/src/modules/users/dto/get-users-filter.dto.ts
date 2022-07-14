import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['email', 'fullName', 'description', 'createdAt', 'updatedAt'])
  orderBy: 'email' | 'fullName' | 'description' | 'createdAt' | 'updatedAt' = 'email';

  @IsOptional()
  @ValidateIf((o) => !!o.orderBy)
  @IsIn(['DESC', 'ASC'])
  orderDirection: 'DESC' | 'ASC' = 'ASC';
}
