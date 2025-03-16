import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ServerOpsErrorMessages } from '../messages';

/**
 * Handles all exceptions thrown by the application.
 */
@Catch()
export class GeneralExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionsFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    let response;

    if (exception instanceof HttpException) {
      response = exception;
    } else {
      response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };

      this.logger.error(
        `${exception.message || ServerOpsErrorMessages.UnknownException}. Stack: ${
          exception.stack
        }`,
      );
    }

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}
