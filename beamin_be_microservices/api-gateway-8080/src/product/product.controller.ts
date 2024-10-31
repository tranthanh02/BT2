import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('api/v1/product')
export class ProductController {
  constructor(@Inject('PRODUCT_NAME') private productService: ClientProxy) {}

  @HttpCode(HttpStatus.OK)
  @Get('get-food')
  async getAllFood(
    @Query('limit') limit: String = '10',
    @Query('sort') sort: String = 'asc',
    @Query('page') page: String = '1',
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    let result = await lastValueFrom(
      this.productService.send('getAll', { limit, sort, page }).pipe(
        timeout(2000),
        retry(3),
        catchError((err) => {
          //ghi log
          return of('Service Product request timeout, please try again !');
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
  @Get('categories')
  async getCategories(@Req() req: Request, @Res() res: Response): Promise<any> {
    let result = await lastValueFrom(
      this.productService.send('getCategories', {}).pipe(
        timeout(2000),
        retry(3),
        catchError((err) => {
          //ghi log
          return of('Service Product request timeout, please try again !');
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
  @Get(':id')
  async findProductById(
    @Req() req: Request,
    @Res() res: Response,
    @Param() id,
  ): Promise<any> {
    let result = await lastValueFrom(
      this.productService.send('findProductById', { id }).pipe(
        timeout(2000),
        retry(3),
        catchError((err) => {
          //ghi log
          return of('Service Product request timeout, please try again !');
        }),
      ),
    );

    return res.status(200).json({
      statusCode: '200',
      message: 'Successfully!',
      content: result,
    });
  }

  @Get('delete-cache')
  async delete() {
    await lastValueFrom(this.productService.emit('deleteCache', {}));
  }

  @Get('search')
  async searchFood(
    @Query('limit') limit: String = '10',
    @Query('sort') sort: String = 'asc',
    @Query('page') page: String = '1',
    @Query('name') name: String,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const result = await lastValueFrom(
      this.productService
        .send('searchProduct', {
          limit,
          sort,
          page,
          name,
        })
        .pipe(
          timeout(2000),
          retry(3),
          catchError((err) => {
            //ghi log
            return of('Service Product request timeout, please try again !');
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
