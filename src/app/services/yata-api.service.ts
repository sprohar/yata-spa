import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export abstract class YataApiService {
  protected readonly baseUrl = environment.api.serverUrl;

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(() => error);
    }

    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );

    if (error.status === HttpStatusCode.Unauthorized) {
      console.log(error.url);
    }

    return throwError(() => error);
  }
}
