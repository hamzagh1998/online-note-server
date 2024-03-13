import { IsNotEmpty } from 'class-validator';

export class GetFolderRequestDto {
  @IsNotEmpty()
  gItemId: string;

  @IsNotEmpty()
  user: { email: string };
}
