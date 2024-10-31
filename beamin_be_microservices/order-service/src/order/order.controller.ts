import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';

import { JwtService } from '@nestjs/jwt';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private jwt: JwtService,
  ) {}

  @MessagePattern('createOrder')
  async createOrder(@Payload() payload) {
    const { token, body } = payload;
    const { userId } = await this.jwt.decode(token);

    return this.orderService.createOrder(userId, body);
  }
}
