import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('getAll')
  getFood(@Payload() payload) {
    return this.productService.getFood(payload);
  }

  @MessagePattern('searchProduct')
  search(@Payload() payload) {
    return this.productService.searchProduct(payload);
  }
  @EventPattern('deleteCache')
  remove() {
    return this.productService.deleteCache();
  }
  @EventPattern('getCategories')
  getCategories() {
    return this.productService.getCategories();
  }

  @EventPattern('findProductById')
  findProductById(@Payload() payload) {
    return this.productService.findProductById(Payload);
  }
}
