import { IsNotEmpty } from 'class-validator';

export class CreateStandDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  applicationId: string;
}
