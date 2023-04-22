import { isDevMode } from '@angular/core';
import { writeFile } from 'fs';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const writeFilePromisified = promisify(writeFile);

const targetPath = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
  production: ${isDevMode() ? 'false' : 'true'},
  api: {
    serverUrl: '${process.env['API_SERVER_URL']}',
  },
  auth: {
    baseUrl: '${process.env['AUTH_SERVER_URL']}',
    endpoints: [
      'authentication/logout',
      'authentication/sign-in',
      'authentication/sign-up',
      'authentication/refresh-tokens',
    ],
    endpoint: {
      logout: 'authentication/logout',
      signIn: 'authentication/sign-in',
      signUp: 'authentication/sign-up',
      refreshToken: 'authentication/refresh-tokens',
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
