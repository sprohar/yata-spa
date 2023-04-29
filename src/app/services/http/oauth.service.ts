import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { AuthResponseDto, GoogleOAuthDto } from '../../auth/dto';
import { HttpErrorService } from './error/http-error.service';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class OAuthService extends YataApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly httpErrorService: HttpErrorService
  ) {
    super();
  }

  signInWithGoogle(dto: GoogleOAuthDto) {
    const url = this.serverUrl + '/authentication/google';
    return this.http
      .post<AuthResponseDto>(url, dto)
      .pipe(take(1), catchError(this.httpErrorService.handleError));
  }
}
