import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GeneralExceptionsFilter } from './core/filters';
import cookieParser from 'cookie-parser';

export const setupApp = (app: INestApplication) => {
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GeneralExceptionsFilter(httpAdapter));
  app.use(cookieParser());
};
