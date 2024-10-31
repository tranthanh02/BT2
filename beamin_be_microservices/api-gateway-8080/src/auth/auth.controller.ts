import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(@Inject('USER_NAME') private userService: ClientProxy) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Body() payload,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    let result = await lastValueFrom(
      this.userService.send('logIn', payload).pipe(
        timeout(2000),
        retry(3),
        catchError((err) => {
          //ghi log
          return of('Service Auth request timeout, please try again !');
        }),
      ),
    );

    return res.status(200).json({
      statusCode: '200',
      message: 'Successfully!',
      content: result,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() payload,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    let result = await lastValueFrom(
      this.userService.send('signIn', payload).pipe(
        timeout(2000),
        retry(3),
        catchError((err) => {
          //ghi log
          return of('Service Auth request timeout, please try again !');
        }),
      ),
    );

    return res.status(200).json({
      statusCode: '200',
      message: 'Successfully!',
      content: result,
    });
  }
}
