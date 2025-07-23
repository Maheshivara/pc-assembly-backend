import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterMotherboardOptions } from './entities/motherboard-filter.entity';
import { Prisma } from 'generated/prisma';
import { PagedEntity } from '../common/entities/paged.entity';
import { Motherboard } from './entities/motherboard.entity';

@Injectable()
export class MotherboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(
    options: FilterMotherboardOptions,
  ): Promise<PagedEntity<Motherboard>> {
    try {
      const whereConditions: Prisma.PlacaMaeWhereInput = {
        ...(options.name
          ? {
              name: {
                contains: options.name,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(options.socket
          ? {
              socket: {
                contains: options.socket,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(options.formFactor
          ? {
              formFactor: options.formFactor,
            }
          : {}),
        ...(options.cpuMpn
          ? {
              CPU_PlacaMae: {
                some: {
                  cpu_mpn: options.cpuMpn,
                },
              },
            }
          : {}),
      };
      const total = await this.prismaService.placaMae.count({
        where: whereConditions,
      });
      const motherboards = await this.prismaService.placaMae.findMany({
        where: whereConditions,
        skip: options.skip(),
        take: options.take(),
        orderBy: {
          name: 'asc',
        },
      });

      const items = motherboards.map((motherboard) => {
        return new Motherboard(
          motherboard.mpn,
          motherboard.name || '',
          motherboard.brand || '',
          motherboard.ean || '',
          motherboard.upc || '',
          motherboard.socket || '',
          motherboard.chipset || '',
          motherboard.formFactor || '',
          motherboard.memoryType || '',
          motherboard.memoryCapacity || 0,
          motherboard.memorySlots || 0,
          motherboard.memorySpeed || '',
          motherboard.sataSlots || 0,
          motherboard.m2PCI3Slots || 0,
          motherboard.m2PCI4Slots || 0,
          motherboard.extensionPCI3x1 || 0,
          motherboard.extensionPCI3x4 || 0,
          motherboard.extensionPCI3x8 || 0,
          motherboard.extensionPCI3x16 || 0,
          motherboard.extensionPCI4x1 || 0,
          motherboard.extensionPCI4x4 || 0,
          motherboard.extensionPCI4x8 || 0,
          motherboard.extensionPCI4x16 || 0,
          motherboard.usb3Slots || 0,
          motherboard.usb3Headers || 0,
          motherboard.usb3CSlots || 0,
          motherboard.vga || 0,
          motherboard.dvi || 0,
          motherboard.dp || 0,
          motherboard.hdmi || 0,
          motherboard.wifi || '',
          motherboard.graphics || '',
          motherboard.imageUrl || '',
          motherboard.productUrl || '',
        );
      });
      return new PagedEntity<Motherboard>(
        items,
        total,
        options.page,
        options.perPage,
      );
    } catch (error) {
      console.error('Error fetching motherboards:', error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(mpn: string): Promise<Motherboard> {
    const motherboard = await this.prismaService.placaMae.findUnique({
      where: { mpn },
    });

    if (!motherboard) {
      throw new NotFoundException();
    }

    return new Motherboard(
      motherboard.mpn,
      motherboard.name || '',
      motherboard.brand || '',
      motherboard.ean || '',
      motherboard.upc || '',
      motherboard.socket || '',
      motherboard.chipset || '',
      motherboard.formFactor || '',
      motherboard.memoryType || '',
      motherboard.memoryCapacity || 0,
      motherboard.memorySlots || 0,
      motherboard.memorySpeed || '',
      motherboard.sataSlots || 0,
      motherboard.m2PCI3Slots || 0,
      motherboard.m2PCI4Slots || 0,
      motherboard.extensionPCI3x1 || 0,
      motherboard.extensionPCI3x4 || 0,
      motherboard.extensionPCI3x8 || 0,
      motherboard.extensionPCI3x16 || 0,
      motherboard.extensionPCI4x1 || 0,
      motherboard.extensionPCI4x4 || 0,
      motherboard.extensionPCI4x8 || 0,
      motherboard.extensionPCI4x16 || 0,
      motherboard.usb3Slots || 0,
      motherboard.usb3Headers || 0,
      motherboard.usb3CSlots || 0,
      motherboard.vga || 0,
      motherboard.dvi || 0,
      motherboard.dp || 0,
      motherboard.hdmi || 0,
      motherboard.wifi || '',
      motherboard.graphics || '',
      motherboard.imageUrl || '',
      motherboard.productUrl || '',
    );
  }
}
