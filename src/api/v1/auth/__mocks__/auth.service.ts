import { registerResStub } from '../test/stubs/auth.stub';

export const AuthService = jest.fn().mockReturnValue({
  register: jest.fn().mockResolvedValue(registerResStub()),
});
