import { environment } from '../../../environments/environment';

export abstract class YataApiService {
  protected readonly serverUrl = environment.api.serverUrl;
}
