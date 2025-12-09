import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception.name === 'MongoServerError') {
      const managedException = exception as MongoServerError;
      const duplicateds = managedException.keyValue as Record<string, unknown>;
      switch (managedException.code) {
        case 11000:
          response.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: `Error, field already saved in DB: ${Object.keys(duplicateds).join(', ')}`,
          });
          return;
      }
    }

    if (exception instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: exception.message,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: 'Critical error in the server, please contact the administrator',
    });
  }
}
