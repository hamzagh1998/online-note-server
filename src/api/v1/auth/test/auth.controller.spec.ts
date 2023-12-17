import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

import { RegisterRequestBodyDto } from '../dto/register-user.req';
import { registerReqStub, registerResStub } from './stubs/auth.stub';

jest.mock('../services/auth.service', () => ({
  AuthService: jest.fn(() => ({
    register: jest.fn().mockResolvedValue(registerResStub()),
  })),
}));

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('when register is called', () => {
    it('should call register service and return a correct response', async () => {
      // Arrange
      const requestStub: RegisterRequestBodyDto = registerReqStub();
      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      // Act
      const res = await authController.register(requestStub, response);

      // Assert
      expect(authService.register).toHaveBeenCalledWith(requestStub);
      // Assert
      expect(authService.register).toHaveBeenCalledWith(requestStub);

      // Check if the response is undefined
      expect(() => {
        if (res === undefined) {
          throw new Error('Response is undefined');
        }
      }).not.toThrow();

      // If the response is defined, assert its contents
      if (res !== undefined) {
        expect(res).toEqual(registerResStub());
      }

      expect(res).toEqual(registerResStub());
    });
  });

  describe('login', () => {
    it('should return "hello"', () => {
      // Act
      const result = authController.login();
      // Assert
      expect(result).toBe('hello');
    });
  });
});
