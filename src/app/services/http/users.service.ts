import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockUser } from '../../__mock';
import { User } from '../../auth/models/user.model';
import { HttpErrorService } from './error/http-error.service';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService
  ) {
    super();
  }

  delete() {
    return of();
  }

  update(user: Partial<User>): Observable<User> {
    return of(Object.assign(mockUser, user));
  }
}
