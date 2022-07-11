import { IsString } from 'class-validator';

class ObjectWithIdDto {
  @IsString()
  id: string;
}

export default ObjectWithIdDto;
