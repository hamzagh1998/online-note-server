import { HttpStatus } from '@nestjs/common';

export type RegistredUserDetailType = {
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string;
};

export type RegisterResponseType = {
  error: boolean;
  statusCode: HttpStatus;
  detail: RegistredUserDetailType;
};
