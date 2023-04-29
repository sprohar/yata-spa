import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../auth/models/user.model';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends YataApiService {
  private readonly serverUrl = environment.api.serverUrl;

  constructor(private readonly http: HttpClient) {
    super();
  }

  update(user: Partial<User>) {
    const url = `${this.serverUrl}/users/me`;
    return this.http
      .patch<User>(url, user)
      .pipe(take(1), catchError(this.handleError));
  }
}
