import * as dotenv from 'dotenv';
import * as R from 'ramda';

dotenv.config();

export enum NodeEnvironment {
  Production = 'production',
  Development = 'development',
}

enum schema {
  NODE_ENV = 'NODE_ENV',
  APP_PORT = 'APP_PORT',
  APP_DOMAIN = 'APP_DOMAIN',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_NAME = 'DB_NAME',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  JWT_SECRET = 'JWT_SECRET',
}

class Config {
  NODE_ENV: NodeEnvironment;
  APP_PORT: number;
  APP_DOMAIN: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
}

let config: Config;

function loadEnvironmentVariables(env) {
  config.NODE_ENV = env.NODE_ENV;
  config.APP_DOMAIN = env.APP_DOMAIN;
  config.APP_PORT = parseInt(env.APP_PORT, 10);
  config.DB_HOST = env.DB_HOST;
  config.DB_PORT = parseInt(env.DB_PORT, 10);
  config.DB_NAME = env.DB_NAME;
  config.DB_USER = env.DB_USER;
  config.DB_PASSWORD = env.DB_PASSWORD;
  config.JWT_SECRET = env.JWT_SECRET;
}

function pickEnvironmentVariables() {
  return R.pick(Object.keys(schema), process.env);
}

export function getConfig(): Config {
  if (config != null) {
    return config;
  }
  config = new Config();
  loadEnvironmentVariables(pickEnvironmentVariables());
  return config;
}
