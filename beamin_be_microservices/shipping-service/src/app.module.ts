import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [PrismaModule, ShippingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
