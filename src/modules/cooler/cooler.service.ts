import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PagedEntity } from '../common/entities/paged.entity';
import { FilterOptionsCooler } from './entities/cooler-filter.entity';
import { CPUCooler } from './entities/cooler.entity';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CoolerService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    options: FilterOptionsCooler,
  ): Promise<PagedEntity<CPUCooler>> {
    try {
      const whereConditions: Prisma.CPU_CoolerWhereInput = {
        ...(options.cpuMpn
          ? {
              cpu_mpn: {
                equals: options.cpuMpn,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(options.name
          ? {
              CPUCooler: {
                name: {
                  contains: options.name,
                  mode: 'insensitive',
                },
              },
            }
          : {}),
      };

      const coolersGroup = await this.prisma.cPU_Cooler.groupBy({
        by: ['cooler_mpn'],
        where: whereConditions,
        _count: true,
      });

      if (coolersGroup.length === 0 || options.skip() >= coolersGroup.length) {
        return new PagedEntity<CPUCooler>([], 0, options.perPage, options.page);
      }
      const coolersMpns = coolersGroup.map((item) => item.cooler_mpn);
      const list = await this.prisma.cPU_Cooler.findMany({
        where: {
          cooler_mpn: {
            in: coolersMpns,
          },
        },
        orderBy: {
          CPUCooler: { name: 'asc' },
        },
        skip: options.skip(),
        take: options.perPage,
        include: {
          CPUCooler: true,
        },
        distinct: ['cooler_mpn'],
      });

      const items = list.map((item) => {
        return new CPUCooler(
          item.cooler_mpn,
          item.CPUCooler.name || '',
          item.CPUCooler.ean || '',
          item.CPUCooler.upc || '',
          item.CPUCooler.brand || '',
          item.CPUCooler.sockets || '',
          item.CPUCooler.height || 0,
          item.CPUCooler.tdp || 0,
          item.CPUCooler.eightMm || 0,
          item.CPUCooler.nintyTwoMm || 0,
          item.CPUCooler.oneHundredTwentyMm || 0,
          item.CPUCooler.oneHundredFortyMm || 0,
          item.CPUCooler.twoHundredMm || 0,
          item.CPUCooler.adicionalFan || false,
          item.CPUCooler.imageUrl || '',
          item.CPUCooler.productUrl || '',
        );
      });
      return new PagedEntity<CPUCooler>(
        items,
        coolersGroup.length,
        options.perPage,
        options.page,
      );
    } catch (error) {
      console.log('Error retrieving CPU coolers:', error);
      throw new InternalServerErrorException('Failed to retrieve CPU coolers');
    }
  }

  async findOne(mpn: string): Promise<CPUCooler> {
    const cooler = await this.prisma.cPUCooler.findUnique({
      where: { mpn: mpn },
    });

    if (!cooler) {
      throw new NotFoundException();
    }

    return new CPUCooler(
      cooler.mpn,
      cooler.name || '',
      cooler.ean || '',
      cooler.upc || '',
      cooler.brand || '',
      cooler.sockets || '',
      cooler.height || 0,
      cooler.tdp || 0,
      cooler.eightMm || 0,
      cooler.nintyTwoMm || 0,
      cooler.oneHundredTwentyMm || 0,
      cooler.oneHundredFortyMm || 0,
      cooler.twoHundredMm || 0,
      cooler.adicionalFan || false,
      cooler.imageUrl || '',
      cooler.productUrl || '',
    );
  }
}
