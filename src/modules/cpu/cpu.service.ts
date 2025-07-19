import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PagedEntity } from '../common/entities/paged.entity';
import { CPU } from './entities/cpu.entity';
import { FilterOptionsCPU } from './entities/cpu-filter.entity';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CpuService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: FilterOptionsCPU): Promise<PagedEntity<CPU>> {
    try {
      const whereConditions: Prisma.CPUWhereInput = {
        ...(options.name
          ? {
              name: {
                contains: options.name,
                mode: 'insensitive',
              },
            }
          : {}),
      };
      const total = await this.prisma.cPU.count({
        where: whereConditions,
      });
      if (total === 0 || options.skip() >= total) {
        return new PagedEntity<CPU>([], total, options.perPage, options.page);
      }
      const items = await this.prisma.cPU.findMany({
        skip: options.skip(),
        take: options.take(),
        orderBy: { name: 'asc' },
        where: whereConditions,
      });

      const cpus = items.map(
        (item) =>
          new CPU(
            item.mpn,
            item.name || '',
            item.ean || '',
            item.brand || '',
            item.cores || 0,
            item.threads || 0,
            item.speed || 0,
            item.turboSpeed || 0,
            item.tdp || 0,
            item.socket || '',
            item.graphics || '',
            item.imageUrl || '',
            item.productUrl || '',
          ),
      );

      return new PagedEntity<CPU>(cpus, total, options.perPage, options.page);
    } catch (error) {
      console.error('Error fetching CPUs:', error);
      throw new InternalServerErrorException(
        'Error fetching CPUs from the database',
      );
    }
  }

  async findOne(mpn: string): Promise<CPU> {
    try {
      const cpu = await this.prisma.cPU.findUnique({
        where: { mpn },
      });
      if (!cpu) {
        throw new NotFoundException();
      }
      return new CPU(
        cpu.mpn,
        cpu.name || '',
        cpu.ean || '',
        cpu.brand || '',
        cpu.cores || 0,
        cpu.threads || 0,
        cpu.speed || 0,
        cpu.turboSpeed || 0,
        cpu.tdp || 0,
        cpu.socket || '',
        cpu.graphics || '',
        cpu.imageUrl || '',
        cpu.productUrl || '',
      );
    } catch (error) {
      console.error('Error fetching CPU:', error);
      throw new InternalServerErrorException('Failed to fetch CPU');
    }
  }
}
