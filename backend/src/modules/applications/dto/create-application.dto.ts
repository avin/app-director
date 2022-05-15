import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
