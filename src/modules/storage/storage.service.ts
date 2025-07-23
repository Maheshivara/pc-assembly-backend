import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterStorageOptions } from './entities/storage-filter.entity';
import { PagedEntity } from '../common/entities/paged.entity';
import { Storage } from './entities/storage.entity';
import { StorageType } from './enum/storate-type.enum';
import { Prisma } from 'generated/prisma';
import { StorageProtocol } from './enum/storage-protocol.enum';

@Injectable()
export class StorageService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(options: FilterStorageOptions): Promise<PagedEntity<Storage>> {
    if (!options.type) {
      const hdConditions: Prisma.Sql[] = [];
      if (options.name)
        hdConditions.push(Prisma.sql`name ILIKE ${'%' + options.name + '%'}`);
      if (options.formFactor)
        hdConditions.push(Prisma.sql`"formFactor" ILIKE ${options.formFactor}`);

      const hdWhere = hdConditions.length
        ? Prisma.sql`WHERE ${Prisma.join(hdConditions, ' AND ')}`
        : Prisma.empty;

      const ssdConditions: Prisma.Sql[] = [];
      if (options.name)
        ssdConditions.push(Prisma.sql`name ILIKE ${'%' + options.name + '%'}`);
      if (options.formFactor)
        ssdConditions.push(
          Prisma.sql`"formFactor" ILIKE ${options.formFactor}`,
        );
      if (options.protocol)
        ssdConditions.push(Prisma.sql`protocol = ${options.protocol}`);

      const ssdWhere = ssdConditions.length
        ? Prisma.sql`WHERE ${Prisma.join(ssdConditions, ' AND ')}`
        : Prisma.empty;

      const storagesCounter = await this.prismaService.$queryRaw<
        { count: number }[]
      >(
        Prisma.sql`
          SELECT COUNT(*) FROM "HD" ${hdWhere}
          UNION ALL
          SELECT COUNT(*) FROM "SSD" ${ssdWhere}
        `,
      );

      const count = storagesCounter.reduce(
        (acc, curr) => acc + Number(curr.count),
        0,
      );

      if (count === 0 || options.skip() >= count) {
        return new PagedEntity<Storage>(
          [],
          count,
          options.perPage,
          options.page,
        );
      }

      const storages = await this.prismaService.$queryRaw<Storage[]>(
        Prisma.sql`
          SELECT mpn, name, ean, UPPER("formFactor") as "formFactor", "brand", "imageUrl", "productUrl", 'HDD' as type, 'SATA' as protocol, capacity*1000 as capacity FROM "HD" ${hdWhere}
          UNION ALL
          SELECT mpn, name, ean, UPPER("formFactor") as "formFactor", "brand", "imageUrl", "productUrl", 'SSD' as type, protocol, capacity FROM "SSD" ${ssdWhere}
          ORDER BY name
          LIMIT ${options.perPage} OFFSET ${options.skip()}
        `,
      );
      return new PagedEntity<Storage>(
        storages,
        count,
        options.perPage,
        options.page,
      );
    }
    if (options.type === StorageType.HDD) {
      const whereConditions: Prisma.HDWhereInput = {
        ...(options.name
          ? { name: { contains: options.name, mode: 'insensitive' } }
          : {}),
        ...(options.formFactor ? { formFactor: options.formFactor } : {}),
        ...(options.protocol ? { protocol: options.protocol } : {}),
      };
      const count = await this.prismaService.hD.count({
        where: whereConditions,
      });
      if (count === 0 || options.skip() >= count) {
        return new PagedEntity<Storage>(
          [],
          count,
          options.perPage,
          options.page,
        );
      }
      const storageHDDs = await this.prismaService.hD.findMany({
        where: whereConditions,
        skip: options.skip(),
        take: options.perPage,
        orderBy: { name: 'asc' },
        select: {
          mpn: true,
          name: true,
          ean: true,
          formFactor: true,
          brand: true,
          capacity: true,
          rpm: true,
          imageUrl: true,
          productUrl: true,
        },
      });
      const items = storageHDDs.map((storage) => {
        return new Storage(
          storage.mpn,
          storage.name || '',
          storage.ean || '',
          StorageType.HDD,
          storage.formFactor || '',
          storage.brand || '',
          StorageProtocol.SATA,
          storage.capacity ? storage.capacity * 1000 || 0 : 0,
          storage.imageUrl || '',
          storage.productUrl || '',
        );
      });
      return new PagedEntity<Storage>(
        items,
        count,
        options.perPage,
        options.page,
      );
    }
    const whereConditions: Prisma.SSDWhereInput = {
      ...(options.name
        ? { name: { contains: options.name, mode: 'insensitive' } }
        : {}),
      ...(options.formFactor ? { formFactor: options.formFactor } : {}),
      ...(options.protocol ? { protocol: options.protocol } : {}),
    };
    const count = await this.prismaService.sSD.count({
      where: whereConditions,
    });
    if (count === 0 || options.skip() >= count) {
      return new PagedEntity<Storage>([], count, options.perPage, options.page);
    }
    const storageSSDs = await this.prismaService.sSD.findMany({
      where: whereConditions,
      skip: options.skip(),
      take: options.perPage,
      orderBy: { name: 'asc' },
      select: {
        mpn: true,
        name: true,
        ean: true,
        formFactor: true,
        brand: true,
        capacity: true,
        protocol: true,
        imageUrl: true,
        productUrl: true,
      },
    });
    const items = storageSSDs.map((storage) => {
      return new Storage(
        storage.mpn,
        storage.name || '',
        storage.ean || '',
        StorageType.SSD,
        storage.formFactor || '',
        storage.brand || '',
        storage.protocol || StorageProtocol.SATA,
        storage.capacity ? storage.capacity || 0 : 0,
        storage.imageUrl || '',
        storage.productUrl || '',
      );
    });
    return new PagedEntity<Storage>(
      items,
      count,
      options.perPage,
      options.page,
    );
  }

  async findOne(mpn: string): Promise<Storage> {
    const storage = await this.prismaService.$queryRaw<Storage>(
      Prisma.sql`SELECT mpn, name, ean, UPPER("formFactor") as "formFactor", "brand", "imageUrl", "productUrl", 'HDD' as type, 'SATA' as protocol, capacity*1000 as capacity FROM "HD"
            WHERE mpn = ${mpn}
            UNION ALL
            SELECT mpn, name, ean, UPPER("formFactor") as "formFactor", "brand", "imageUrl", "productUrl", 'SSD' as type, protocol, capacity FROM "SSD"
            WHERE mpn = ${mpn}
          LIMIT 1
      `,
    );
    if (!storage) {
      throw new NotFoundException();
    }
    return storage;
  }
}
