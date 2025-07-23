import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterGPUOptions } from './entities/gpu-filter.entity';
import { PagedEntity } from '../common/entities/paged.entity';
import { GPU } from './entities/gpu.entity';
import { Prisma } from 'generated/prisma';

@Injectable()
export class GpuService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: FilterGPUOptions): Promise<PagedEntity<GPU>> {
    try {
      const whereConditions: Prisma.GPUWhereInput = {
        ...(options.name
          ? {
              name: {
                contains: options.name,
                mode: 'insensitive',
              },
            }
          : {}),
      };
      const total = await this.prisma.gPU.count({
        where: whereConditions,
      });
      if (total === 0 || options.skip() >= total) {
        return new PagedEntity<GPU>([], total, options.perPage, options.page);
      }

      const gpus = await this.prisma.gPU.findMany({
        skip: options.skip(),
        take: options.take(),
        orderBy: { name: 'asc' },
        where: whereConditions,
      });

      const items = gpus.map(
        (item) =>
          new GPU(
            item.mpn,
            item.name || '',
            item.ean || '',
            item.brand || '',
            item.length || 0,
            item.widthSlots || 0,
            item.eightPin || 0,
            item.sixPin || 0,
            item.hdmi || 0,
            item.dp || 0,
            item.dvi || 0,
            item.vga || 0,
            item.boostClockSpeed || 0,
            item.vram || 0,
            item.memoryClockSpeed || 0,
            item.tdp || 0,
            item.sync || '',
            item.imageUrl || '',
            item.productUrl || '',
          ),
      );
      return new PagedEntity<GPU>(items, total, options.perPage, options.page);
    } catch (error) {
      console.error('Error fetching GPUs:', error);
      throw new InternalServerErrorException('Error fetching GPUs');
    }
  }

  async findOne(mpn: string): Promise<GPU> {
    const gpu = await this.prisma.gPU.findUnique({
      where: { mpn },
    });
    if (!gpu) {
      throw new NotFoundException();
    }
    return new GPU(
      gpu.mpn,
      gpu.name || '',
      gpu.ean || '',
      gpu.brand || '',
      gpu.length || 0,
      gpu.widthSlots || 0,
      gpu.eightPin || 0,
      gpu.sixPin || 0,
      gpu.hdmi || 0,
      gpu.dp || 0,
      gpu.dvi || 0,
      gpu.vga || 0,
      gpu.boostClockSpeed || 0,
      gpu.vram || 0,
      gpu.memoryClockSpeed || 0,
      gpu.tdp || 0,
      gpu.sync || '',
      gpu.imageUrl || '',
      gpu.productUrl || '',
    );
  }
}
