import { HttpStatus } from '@nestjs/common';

import { RegisterRequestBodyDto } from '../../dto/register-user.req';

import { RegisterResponseType } from '../../types/auth.types';

export function registerReqStub(): RegisterRequestBodyDto {
  return {
    firstName: 'jhon',
    lastName: 'doe',
    email: 'john-doe@email.com',
    photoURL: 'https://avatar.com',
    provider: 'email',
  };
}
// We use a functions to return new stub object ref for different tests
export function registerResStub(): RegisterResponseType {
  return {
    error: false,
    statusCode: HttpStatus.CREATED,
    detail: {
      firstName: 'jhon',
      lastName: 'doe',
      email: 'john-doe@email.com',
      photoURL: 'https://avatar.com',
    },
  };
}
