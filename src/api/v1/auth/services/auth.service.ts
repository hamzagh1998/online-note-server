import { HttpStatus, Injectable } from '@nestjs/common';

import { UserDocument } from 'src/database/models/user/user.schema';

import { UserRepository } from 'src/database/models/user/user.repository';
import { PlanRepository } from 'src/database/models/plan/plan.repository';
import { FolderRepository } from 'src/database/models/folder/folder.repository';
import { ProfileRepository } from 'src/database/models/profile/profile.repository';

import { RegisterRequestBodyDto } from '../dto/register-user.req';
import { LoginRequestBodyDto } from '../dto/login-user.req';

import { RegistredUserDetailType } from '../types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private planRepository: PlanRepository,
    private folderRepository: FolderRepository,
    private profileRepository: ProfileRepository,
  ) {}
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
          error: true,
          statusCode: HttpStatus.CONFLICT,
          detail: 'User with this email already exists',
        };
      const userData = (await this.userRepo.create({
        ...body,
        photoURL: avatar,
      })) as UserDocument;

      const planDoc = await this.planRepository.findOne({ type: 'free' }); // Default free plan

      await this.folderRepository.checkAndCreate(
        { owner: userData._id },
        { owner: userData._id },
      );
      await this.profileRepository.checkAndCreate(
        { owner: userData._id },
        {
          owner: userData._id,
          plan: planDoc._id,
        },
      );

      const result: RegistredUserDetailType = {
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

  async login(body: LoginRequestBodyDto | RegisterRequestBodyDto) {
    const { email, provider } = body;
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      if (provider === 'google') {
        return this.register(body as RegisterRequestBodyDto);
      }
      return {
        error: true,
        statusCode: HttpStatus.CONFLICT,
        detail: "User with this email doesn't",
      };
    }

    const result: RegistredUserDetailType = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoURL: user.photoURL,
    };
    return { error: false, statusCode: HttpStatus.OK, detail: result };
  }
}
