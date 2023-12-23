import { IsNotEmpty, IsEmail, IsIn } from 'class-validator';

export class LoginRequestBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(['email', 'google'])
  provider: string;

  photoURL?: string;
}
