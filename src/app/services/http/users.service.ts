import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
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

  update(user: Partial<User>) {
    const url = `${this.serverUrl}/users/me`;
    return this.http
      .patch<User>(url, user)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }
}
