import { IsNotEmpty } from 'class-validator';

export class CreateFolderRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  parentDirectory: string;

  password: string;

  @IsNotEmpty()
  user: { email: string };
}
