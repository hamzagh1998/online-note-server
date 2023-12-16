import { HttpStatus, Injectable } from '@nestjs/common';

import { UserDocument } from 'src/database/schemas/user/user.schema';

import { UserRepository } from 'src/database/schemas/user/user.repository';

import { RegisterRequestDto } from '../dto/register-user.req';
import { RegisterResponsetDto } from '../dto/register-user.res';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepository) {}
  async registerService(body: RegisterRequestDto) {
    try {
      const { firstName, lastName, provider, photoURL } = body;
      const avatar =
        provider === 'email'
          ? `https://api.dicebear.com/6.x/initials/svg?radius=50&seed=${firstName} ${lastName}`
          : photoURL;

      const userData = (await this.userRepo.create({
        ...body,
        photoURL: avatar,
      })) as UserDocument;

      const result: RegisterResponsetDto = {
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
