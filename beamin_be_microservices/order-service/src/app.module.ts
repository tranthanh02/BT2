import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    OrderModule,

    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
