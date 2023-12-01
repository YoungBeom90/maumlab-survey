import { HttpException, HttpStatus } from '@nestjs/common';

export function DefaultServerException(msg: string, status?: HttpStatus) {
  console.error('Error message: ', msg);
  throw new HttpException(msg, status || HttpStatus.INTERNAL_SERVER_ERROR);
}

export function QueryFailedException(query: string, msg: string) {
  console.error('Query: ', query, 'Error message: ', msg);
  throw new HttpException(msg, HttpStatus.BAD_REQUEST);
}
