import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserDocument } from 'src/database/models/user/user.schema';

import { RegisterRequestBodyDto } from '../dto/register-user.req';
import { LoginRequestBodyDto } from '../dto/login-user.req';

import { RegistredUserDetailType } from '../types/auth.types';

import { UserRepository } from 'src/database/models/user/user.repository';
import { PlanRepository } from 'src/database/models/plan/plan.repository';
import { FolderRepository } from 'src/database/models/folder/folder.repository';
import { ProfileRepository } from 'src/database/models/profile/profile.repository';
import { NotificationRepository } from 'src/database/models/notifictaions/notification.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private planRepository: PlanRepository,
    private folderRepository: FolderRepository,
    private profileRepository: ProfileRepository,
    private notificationRepository: NotificationRepository,
  ) {}
  async registerService(body: RegisterRequestBodyDto) {
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
      const userDoc = (await this.userRepo.create({
        ...body,
        photoURL: avatar,
      })) as UserDocument;

      const planDoc = await this.planRepository.findOne({ type: 'free' }); // Default free plan

      await this.folderRepository.checkAndCreate(
        { owner: userDoc._id },
        { owner: userDoc._id, isRoot: true },
      );
      await this.profileRepository.checkAndCreate(
        { owner: userDoc._id },
        {
          owner: userDoc._id,
          plan: planDoc._id,
        },
      );

      const notification = {
        id: uuidv4(),
        owner: userDoc._id,
        title: 'Greeting 👋',
        content: `Hello ${userDoc.firstName} We are thrilled to welcome you to OnlineNote. Your account is now set up and ready for you to explore and take notes. Happy noting 😉`,
      };
      await this.notificationRepository.create(notification);

      const result: RegistredUserDetailType = {
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        email: userDoc.email,
        photoURL: userDoc.photoURL,
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

  async loginService(body: LoginRequestBodyDto | RegisterRequestBodyDto) {
    const { email, provider } = body;
    const userDoc = await this.userRepo.findOne({ email });
    if (!userDoc) {
      if (provider === 'google') {
        return this.registerService(body as RegisterRequestBodyDto);
      }
      return {
        error: true,
        statusCode: HttpStatus.CONFLICT,
        detail: "User with this email doesn't exists",
      };
    }

    const result: RegistredUserDetailType = {
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      email: userDoc.email,
      photoURL: userDoc.photoURL,
    };
    return { error: false, statusCode: HttpStatus.OK, detail: result };
  }

  async authService(email: string) {
    const userDoc = await this.userRepo.findOne({ email });
    if (!userDoc) {
      return {
        error: true,
        statusCode: HttpStatus.CONFLICT,
        detail: "User with this email doesn't exists",
      };
    }

    const result: RegistredUserDetailType = {
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      email: userDoc.email,
      photoURL: userDoc.photoURL,
    };
    return { error: false, statusCode: HttpStatus.OK, detail: result };
  }
}
