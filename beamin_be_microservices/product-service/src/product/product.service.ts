import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private elasticService: ElasticsearchService,
  ) {}

  async getFood(payload) {
    let dataCache = await this.cacheManager.get('listFood');

    if (dataCache) {
      console.log('lấy từ cache');
      return dataCache;
    }
    const { page, sort, limit } = payload;
    const skip = page > 0 ? limit * (page - 1) : 0;

    const listFood =
      (await this.prisma.fooditems.findMany({
        orderBy: { price: sort },
        skip,
        take: +limit,
        include: {
          categories: {
            select: {
              category_name: true,
              description: true,
            },
          },
        },
      })) ?? [];
    this.cacheManager.set('listFood', listFood);
    return listFood;
  }

  deleteCache() {
    this.cacheManager.reset();
    console.log('Đã xóa cache');

    return 'Đã xóa cache';
  }

  async searchProduct(payload) {
    const { name, page, limit } = payload;
    let data = await this.elasticService.search({
      index: 'product-index',
      from: (page - 1) * limit,
      size: limit,
      sort: [{ price: { order: 'asc' } }],
      query: {
        match: {
          name: name,
        },
      },
    });

    return data || [];
  }
  async getCategories() {
    let data = await this.prisma.categories.findMany();
    return data || [];
  }
  async findProductById(payload) {
    const food =
      (await this.prisma.fooditems.findFirst({
        where: { food_id: payload.id },
        include: {
          categories: {
            select: {
              category_name: true,
              description: true,
            },
          },
        },
      })) ?? [];
    return food;
  }
}
