import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiService } from '../../services/api.service';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ApiService {
  private readonly baseUrl = environment.authUrl;
  private readonly controller = 'authentication';

  constructor(private http: HttpClient) {
    super();
  }

  signIn(dto: AuthDto) {
    const url = `${this.baseUrl}/${this.controller}/sign-in`;
    return this.http
      .post<AuthResponseDto>(url, dto)
      .pipe(catchError(this.handleError));
  }

  signUp(dto: AuthDto) {
    const url = `${this.baseUrl}/${this.controller}/sign-up`;
    return this.http
      .post<AuthResponseDto>(url, dto)
      .pipe(catchError(this.handleError));
  }
}
