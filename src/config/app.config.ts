export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongodb: process.env.MONGODB || '',
  defaultLimit: process.env.DEFAULT_LIMIT
    ? parseInt(process.env.DEFAULT_LIMIT, 10)
    : 5,
});
