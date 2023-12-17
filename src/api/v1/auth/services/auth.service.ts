import { HttpStatus, Injectable } from '@nestjs/common';

import { UserDocument } from 'src/database/schemas/user/user.schema';

import { UserRepository } from 'src/database/schemas/user/user.repository';

import { RegisterRequestBodyDto } from '../dto/register-user.req';

import { RegistedrUserDetailType } from '../types/register-user.type';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepository) {}
  async register(body: RegisterRequestBodyDto) {
    try {
      const { firstName, lastName, email, provider, photoURL } = body;
      const avatar =
        provider === 'email'
          ? `https://api.dicebear.com/6.x/initials/svg?radius=50&seed=${firstName} ${lastName}`
          : photoURL;

      const isEmailExists = await this.userRepo.findOne({ email });
      if (isEmailExists)
        return {
          error: false,
          statusCode: HttpStatus.CONFLICT,
          detail: 'User with this email already exists',
        };
      const userData = (await this.userRepo.create({
        ...body,
        photoURL: avatar,
      })) as UserDocument;

      const result: RegistedrUserDetailType = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        photoURL: userData.photoURL,
      };
      return { error: false, statusCode: HttpStatus.CREATED, detail: result };
    } catch (error) {
      return {
        error: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        detail: 'Internal server error!',
      };
    }
  }
}
