import { HttpException, HttpStatus } from '@nestjs/common';

export function precondition(
  condition: any,
  status: HttpStatus,
  msg?: string,
): asserts condition {
  if (!condition) {
    throw new HttpException(msg, status);
  }
}
