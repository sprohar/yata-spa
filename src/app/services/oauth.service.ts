import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponseDto, GoogleOAuthDto } from '../auth/dto';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class OAuthService extends YataApiService {
  private readonly serverUrl = environment.auth.serverUrl;

  constructor(private readonly http: HttpClient) {
    super();
  }

  signInWithGoogle(dto: GoogleOAuthDto) {
    const url = this.serverUrl + '/authentication/google';
    return this.http
      .post<AuthResponseDto>(url, dto)
      .pipe(take(1), catchError(this.handleError));
  }
}
