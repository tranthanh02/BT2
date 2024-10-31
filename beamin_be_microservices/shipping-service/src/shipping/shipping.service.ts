import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShippingService {
  constructor(private readonly prisma: PrismaService) {}
  async create(payload) {
    const createShipping = await this.prisma.shippingdetails.create({
      data: {
        order_id: payload.order_id,
        shipping_status: 'Processing',
        shipping_address: payload.shipping_address,
        estimated_delivery: new Date(
          new Date().setDate(new Date().getDate() + 7),
        ),
      },
    });
    return createShipping;
  }
}
