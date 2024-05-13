import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { Timeout } from 'src/decorators/timeout.decorator';
import { isEmpty } from 'src/utils/validation-utils';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const timeoutAmount = this.reflector.get(Timeout, context.getHandler());
    console.log('[interceptor] timeout: ', timeoutAmount);
    if (isEmpty(timeoutAmount)) return next.handle();
    return next.handle().pipe(
      timeout(timeoutAmount),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
