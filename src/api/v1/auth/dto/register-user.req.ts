import { IsNotEmpty, IsEmail, IsIn } from 'class-validator';

export class RegisterRequestBodyDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(['email', 'google'])
  provider: string;

  photoURL?: string;
}
