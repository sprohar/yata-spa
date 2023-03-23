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
        today: 'chrono/today/tasks',
      },
    },
  },
  auth: {
    baseUrl: 'http://localhost:3000/authentication',
    endpoints: ['logout', 'sign-in', 'sign-up', 'refresh-tokens'],
    endpoint: {
      logout: 'logout',
      signIn: 'sign-in',
      signUp: 'sign-up',
      refreshToken: 'refresh-tokens',
    },
    token: {
      ttl: 1200,
    },
  },
};
