export const environment = {
  app: {
    entryPath: '/app',
  },
  api: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      tags: 'tags',
      chrono: {
        tasks: 'chrono/tasks',
      },
    },
  },
  auth: {
    baseUrl: 'http://localhost:3000',
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
      ttl: 1200,
    },
  },
};
