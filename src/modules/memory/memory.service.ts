import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterMemoryOptions } from './entities/memory-filter.entity';
import { PagedEntity } from '../common/entities/paged.entity';
import { Memory } from './entities/memory.entity';
import { Prisma } from 'generated/prisma';

@Injectable()
export class MemoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: FilterMemoryOptions): Promise<PagedEntity<Memory>> {
    try {
      const whereConditions: Prisma.MemoriaRAMWhereInput = {
        ...(options.name
          ? { name: { contains: options.name, mode: 'insensitive' } }
          : {}),
        ...(options.mbMpn
          ? { PlacaMae_MemoriaRAM: { some: { placamae_mpn: options.mbMpn } } }
          : {}),
        ...(options.type ? { type: options.type } : {}),
      };

      const total = await this.prisma.memoriaRAM.count({
        where: whereConditions,
      });
      if (total === 0 || options.skip() >= total) {
        return new PagedEntity<Memory>(
          [],
          total,
          options.perPage,
          options.page,
        );
      }

      const memories = await this.prisma.memoriaRAM.findMany({
        skip: options.skip(),
        take: options.take(),
        orderBy: { name: 'asc' },
        where: whereConditions,
      });

      const items = memories.map(
        (item) =>
          new Memory(
            item.mpn,
            item.name || '',
            item.ean || '',
            item.brand || '',
            item.type || '',
            item.capacity || 0,
            item.clockSpeed || 0,
            item.timings || '',
            item.imageUrl || '',
            item.productUrl || '',
          ),
      );

      return new PagedEntity<Memory>(
        items,
        total,
        options.perPage,
        options.page,
      );
    } catch (error) {
      console.error('Error fetching memories:', error);
      throw new InternalServerErrorException();
    }
  }
  async findOne(mpn: string): Promise<Memory> {
    try {
      const memory = await this.prisma.memoriaRAM.findUnique({
        where: { mpn },
      });
      if (!memory) {
        throw new NotFoundException();
      }
      return new Memory(
        memory.mpn,
        memory.name || '',
        memory.ean || '',
        memory.brand || '',
        memory.type || '',
        memory.capacity || 0,
        memory.clockSpeed || 0,
        memory.timings || '',
        memory.imageUrl || '',
        memory.productUrl || '',
      );
    } catch (error) {
      console.error('Error fetching memory:', error);
      throw new InternalServerErrorException();
    }
  }
}
