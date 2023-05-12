import { AuthResponseDto } from '../auth/dto';
import { mockUser } from './mock-user';

export const mockAuthResponse: AuthResponseDto = {
  accessToken: 'authorized',
  user: mockUser,
};
