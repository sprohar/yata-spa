import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../auth/models/user.model';
import { mockUser } from '../../__mock';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends YataApiService {
  constructor() {
    super();
  }

  delete() {
    return of();
  }

  update(user: Partial<User>): Observable<User> {
    return of({
      ...mockUser,
      ...user,
    });
  }
}
