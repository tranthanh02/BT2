import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    @Inject('SHIPPING_NAME') private shippingService: ClientProxy,
  ) {}

  async createOrder(userId, body) {
    const checkUser = await this.prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!checkUser) throw new BadRequestException(`User already exists!`);

    const { listProducts, shipping_address } = body;

    const checkInventory = await this.checkInventory(listProducts);
    if (!checkInventory) throw new BadRequestException('BadRequest!');

    const inventoryFood = await this.updateInventory(listProducts);

    const totalPrice = listProducts.reduce(
      (acc, product) => acc + product.price,
      0,
    );

    const createOrder = await this.prisma.orders.create({
      data: {
        user_id: userId,
        total_amount: totalPrice,
        order_status: 'Completed',
      },
    });
    const createOrderDetail = await this.createOrderDetail(
      createOrder.order_id,
      listProducts,
    );

    const createShipping = await lastValueFrom(
      this.shippingService
        .send('createShipping', {
          order_id: createOrder.order_id,
          shipping_status: 'shipping_status',
          shipping_address,
        })
        .pipe(
          timeout(2000),
          retry(3),
          catchError((err) => {
            return of('Service Shipping request timeout, please try again !');
          }),
        ),
    );

    return {
      order: createOrder,
      shipping: createShipping,
    };
  }

  private async checkInventory(listProduct) {
    try {
      for (const product of listProduct) {
        await this.prisma.inventory.findFirstOrThrow({
          where: {
            food_id: product.productId,
            stock_quantity: {
              gte: product.quantity,
            },
          },
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private async updateInventory(listProduct) {
    for (const product of listProduct) {
      await this.prisma.inventory.update({
        where: {
          food_id: product.productId,
        },
        data: {
          stock_quantity: {
            decrement: product.productId,
          },
        },
      });
    }
  }
  private async createOrderDetail(orderId, listProduct) {
    try {
      const listOrderItemdetail = listProduct.map((product) => ({
        food_id: product.productId,
        quantity: product.quantity,
        price: product.price,
        order_id: orderId,
      }));

      const rerult = await this.prisma.orderitems.createManyAndReturn({
        data: listOrderItemdetail,
        skipDuplicates: true,
      });
      return rerult;
    } catch (error) {
      console.log('error ', error);
    }
  }
}
