import { get } from '@dotenvx/dotenvx';

const config: unknown = {
  development: {
    dialect: 'postgres',
    host: get('POSTGRESQL_HOST') || 'localhost',
    port: parseInt(get('POSTGRESQL_PORT'), 10) || 35432,
    database: get('POSTGRESQL_DATABASE'),
    username: get('POSTGRESQL_USERNAME'),
    password: get('POSTGRESQL_PASSWORD'),
  },
  test: {
    dialect: 'postgres',
    host: get('POSTGRESQL_HOST') || 'localhost',
    port: parseInt(get('POSTGRESQL_PORT'), 10) || 35432,
    database: get('POSTGRESQL_DATABASE'),
    username: get('POSTGRESQL_USERNAME'),
    password: get('POSTGRESQL_PASSWORD'),
  },
  production: {
    dialect: 'postgres',
    host: get('POSTGRESQL_HOST') || 'localhost',
    port: parseInt(get('POSTGRESQL_PORT'), 10) || 35432,
    database: get('POSTGRESQL_DATABASE'),
    username: get('POSTGRESQL_USERNAME'),
    password: get('POSTGRESQL_PASSWORD'),
  },
};

export = config;
