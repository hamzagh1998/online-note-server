import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  parentDirectory: string;

  password: string;

  @IsNotEmpty()
  user: { email: string };
}

export class uploadFileRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ressourceLink: string;

  @IsOptional()
  extension?: string;

  @IsNotEmpty()
  fileSizeMB: number;

  @IsOptional()
  fileType?: string;

  @IsNotEmpty()
  parentDirectory: string;

  @IsNotEmpty()
  user: { email: string };
}
