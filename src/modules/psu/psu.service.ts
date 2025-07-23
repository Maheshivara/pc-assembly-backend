import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterOptionsPSU } from './entities/psu-filter.entity';
import { Prisma } from 'generated/prisma';
import { PagedEntity } from '../common/entities/paged.entity';
import { PSU } from './entities/psu.entity';

@Injectable()
export class PsuService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: FilterOptionsPSU): Promise<PagedEntity<PSU>> {
    try {
      const whereOptions: Prisma.FonteDeAlimentacaoWhereInput = {
        ...(options.name && {
          name: { contains: options.name, mode: 'insensitive' },
        }),
        ...(options.tdp && {
          OR: options.getUncertain
            ? [{ power: { gte: options.tdp } }, { power: 0 }]
            : [{ power: { gte: options.tdp } }],
        }),
        ...(options.type && {
          type: { contains: options.type, mode: 'insensitive' },
        }),
      };
      const total = await this.prisma.fonteDeAlimentacao.count({
        where: whereOptions,
      });
      const psus = await this.prisma.fonteDeAlimentacao.findMany({
        where: whereOptions,
        skip: options.skip(),
        take: options.take(),
        orderBy: { name: 'asc' },
      });

      const items = psus.map(
        (psu) =>
          new PSU(
            psu.mpn,
            psu.name || '',
            psu.ean || '',
            psu.brand || '',
            psu.power || 0,
            psu.efficiency || '',
            psu.type || '',
            psu.eightPin || 0,
            psu.sixPin || 0,
            psu.imageUrl || '',
            psu.productUrl || '',
          ),
      );

      const pagedResult = new PagedEntity<PSU>(
        items,
        total,
        options.page,
        options.perPage,
      );
      return pagedResult;
    } catch (error) {
      console.error('Error fetching PSUs:', error);
      throw new InternalServerErrorException('Failed to fetch PSUs');
    }
  }

  async findOne(mpn: string): Promise<PSU> {
    const psu = await this.prisma.fonteDeAlimentacao.findUnique({
      where: { mpn },
    });

    if (!psu) {
      throw new NotFoundException();
    }

    return new PSU(
      psu.mpn,
      psu.name || '',
      psu.ean || '',
      psu.brand || '',
      psu.power || 0,
      psu.efficiency || '',
      psu.type || '',
      psu.eightPin || 0,
      psu.sixPin || 0,
      psu.imageUrl || '',
      psu.productUrl || '',
    );
  }
}
