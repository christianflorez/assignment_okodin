const config = {
  "development": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": "assignment_okodin_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "christian",
    "password": null,
    "database": "assignment_okodin_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
};


module.exports = config;