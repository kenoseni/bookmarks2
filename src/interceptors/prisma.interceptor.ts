import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function HandleDatabaseError() {
  return UseInterceptors(new PrismaInterceptor());
}

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
          if (error.code === 'P2021') {
            throw new BadRequestException(
              'Invalid x-talent-id credentials in request headers',
            );
          }
          throw error;
        }
        return throwError(() => error);
      }),
    );
  }
}
