import { HttpStatus } from '@nestjs/common';

export type RegistedrUserDetailType = {
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string;
};

export type RegisterResponseType = {
  error: boolean;
  statusCode: HttpStatus;
  detail: RegistedrUserDetailType;
};
