import { HttpStatus } from '@nestjs/common';
import { UserRepository } from 'src/database/models/user/user.repository';
import { UserDocument } from 'src/database/models/user/user.schema';

export class Base {
  error: boolean = false;
  statusCode: HttpStatus;
  detail: string | object;

  user: UserDocument;
  constructor(public userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async checkUser(email: string) {
    try {
      const userDoc = await this.userRepo.findOne({ email });
      if (!userDoc) {
        return this.result(
          true,
          HttpStatus.NOT_FOUND,
          "User with this email doesn't exist!",
        );
      }
      this.user = userDoc;
      return this.result(false, HttpStatus.OK, userDoc);
    } catch (error) {
      this.result(
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error!',
      );
    }
  }

  result(error: boolean, statusCode: HttpStatus, detail: string | object) {
    this.error = error;
    this.statusCode = statusCode;
    this.detail = detail;
    return {
      error: this.error,
      statusCode: this.statusCode,
      detail: this.detail,
    };
  }
}
