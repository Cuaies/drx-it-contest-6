import * as dotenvx from '@dotenvx/dotenvx';
import { Dialect } from 'sequelize';

// TODO: change

interface ISequelizeConfig {
  [key: string]: {
    dialect: Dialect;
    url?: string;
    [key: string]: string | number;
  };
}

const config: ISequelizeConfig = {
  development: {
    dialect: 'postgres',
    host: dotenvx.get('POSTGRESQL_HOST') || 'localhost',
    port: parseInt(dotenvx.get('POSTGRESQL_PORT'), 10) || 35432,
    database: dotenvx.get('POSTGRESQL_DATABASE'),
    username: dotenvx.get('POSTGRESQL_USERNAME'),
    password: dotenvx.get('POSTGRESQL_PASSWORD'),
  },
  test: {
    dialect: 'postgres',
    host: dotenvx.get('POSTGRESQL_HOST') || 'localhost',
    port: parseInt(dotenvx.get('POSTGRESQL_PORT'), 10) || 35432,
    database: dotenvx.get('POSTGRESQL_DATABASE'),
    username: dotenvx.get('POSTGRESQL_USERNAME'),
    password: dotenvx.get('POSTGRESQL_PASSWORD'),
  },
  production: {
    dialect: 'postgres',
    host: dotenvx.get('POSTGRESQL_HOST') || 'localhost',
    port: parseInt(dotenvx.get('POSTGRESQL_PORT'), 10) || 35432,
    database: dotenvx.get('POSTGRESQL_DATABASE'),
    username: dotenvx.get('POSTGRESQL_USERNAME'),
    password: dotenvx.get('POSTGRESQL_PASSWORD'),
  },
};

export = config;
