import { isDevMode } from '@angular/core';
import { writeFile } from 'fs';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

dotenv.config();

const writeFilePromisified = promisify(writeFile);

const targetPath = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
  production: ${isDevMode() ? 'false' : 'true'},
  api: {
    serverUrl: '${process.env['API_SERVER_URL']}',
  },
  auth: {
    serverUrl: '${process.env['AUTH_SERVER_URL']}',
    endpoints: [
      'auth/logout',
      'auth/sign-in',
      'auth/sign-up',
      'auth/refresh-tokens',
    ],
    endpoint: {
      logout: 'auth/logout',
      signIn: 'auth/sign-in',
      signUp: 'auth/sign-up',
      refreshToken: 'auth/refresh-tokens',
    },
    token: {
      ttl: process.env['TOKEN_TTL'] ? parseInt(${
        process.env['TOKEN_TTL']
      }) : 180,
    },
  },
  oauth: {
    google: {
      clientId: '${process.env['GOOGLE_CLIENT_ID']}',
    },
  },
};
`;

(async () => {
  try {
    await writeFilePromisified(targetPath, envConfigFile);
  } catch (err) {
    console.error(err);
    throw err;
  }
})();
