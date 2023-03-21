export const environment = {
  app: {
    entryPath: '/app',
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
