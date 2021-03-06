module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL
    || 'postgresql://dunder_mifflin@localhost/mPath',

  JWT_SECRET: process.env.JWT_SECRET || 'its-a-secret',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000/'
};