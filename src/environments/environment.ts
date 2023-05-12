export const environment = {
  production: false,
  api: {
    serverUrl: 'http://localhost:42069/api',
  },
  auth: {
    serverUrl: 'http://localhost:42069/api',
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
    social: {
      google: 'auth/google',
    },
    token: {
      ttl: 1200,
    },
  },
  oauth: {
    google: {
      clientId:
        '',
    },
  },
};
