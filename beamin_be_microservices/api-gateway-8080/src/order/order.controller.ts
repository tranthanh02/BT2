import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

import { Request, Response } from 'express';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

@Controller('api/v1/orders')
export class OrderController {
  constructor(@Inject('ORDER_NAME') private orderService: ClientProxy) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Headers('token') token: any,
    @Body() body,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    let result = await lastValueFrom(
      this.orderService.send('createOrder', { token, body }).pipe(
        timeout(2000),
        retry(3),
        catchError((err) => {
          //ghi log
          return of('Service order request timeout, please try again !');
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
