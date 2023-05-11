import { User } from '../auth/models/user.model';
import { TaskView } from '../interfaces';

export const mockUser: User = {
  id: '1',
  email: 'testuser@example.com',
  username: 'Test User',
  preferences: {
    defaultDueDateToday: true,
    isDarkTheme: true,
    taskView: TaskView.INFORMATIVE,
  },
  createdAt: new Date(new Date().setHours(0, 0, 0)),
};
