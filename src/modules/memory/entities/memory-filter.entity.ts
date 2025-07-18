import { ApiProperty } from '@nestjs/swagger';
import { PaginationOptions } from 'src/modules/common/entities/paged.entity';

export class FilterMemoryOptions extends PaginationOptions {
  @ApiProperty({
    description: 'Filter by memory module name',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Filter by motherboard MPN',
    required: false,
  })
  mbMpn?: string;

  @ApiProperty({
    description: 'Filter by memory type',
    required: false,
  })
  type?: string;

  constructor(
    page: number = 1,
    perPage: number = 10,
    name?: string,
    mbMpn?: string,
    type?: string,
  ) {
    super(page, perPage);
    this.name = name;
    this.mbMpn = mbMpn;
    this.type = type;
  }
}
