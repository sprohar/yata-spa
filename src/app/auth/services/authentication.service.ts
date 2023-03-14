import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { AuthDto } from '../dto/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly baseUrl = environment.authUrl;
  private readonly controller = 'authentication';

  constructor(private http: HttpClient) {}

  signIn(dto: AuthDto) {
    const url = `${this.baseUrl}/${this.controller}/sign-in`;
    return this.http.post<AuthResponseDto>(url, dto);
  }

  signUp(dto: AuthDto) {
    const url = `${this.baseUrl}/${this.controller}/sign-up`;
    return this.http.post<AuthResponseDto>(url, dto);
  }
}
