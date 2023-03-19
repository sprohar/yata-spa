export const environment = {
  apiUrl: 'http://localhost:3000',
  auth: {
    url: 'http://localhost:3000/authentication',
    endpoints: ['sign-in', 'sign-up', 'refresh-tokens'],
    token: {
      ttl: 1200,
    },
  },
};
