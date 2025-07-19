import { ApiProperty } from '@nestjs/swagger';

export class Memory {
  @ApiProperty({ description: 'RAM module name' })
  name?: string;

  @ApiProperty({ description: 'Manufacturer Part Number (unique identifier)' })
  mpn: string;

  @ApiProperty({ description: 'EAN code' })
  ean?: string;

  @ApiProperty({ description: 'Brand of the RAM' })
  brand?: string;

  @ApiProperty({ description: 'Type of RAM' })
  type?: string;

  @ApiProperty({
    type: Number,
    description: 'Capacity in MB or GB',
  })
  capacity?: number;

  @ApiProperty({
    type: Number,
    description: 'Clock speed in MHz',
  })
  clockSpeed?: number;

  @ApiProperty({ description: 'Memory timings' })
  timings?: string;

  @ApiProperty({ description: 'Image URL' })
  imageUrl?: string;

  @ApiProperty({ description: 'Product page URL' })
  productUrl?: string;

  constructor(
    mpn: string,
    name?: string,
    ean?: string,
    brand?: string,
    type?: string,
    capacity?: number,
    clockSpeed?: number,
    timings?: string,
    imageUrl?: string,
    productUrl?: string,
  ) {
    this.mpn = mpn;
    this.name = name;
    this.ean = ean;
    this.brand = brand;
    this.type = type;
    this.capacity = capacity;
    this.clockSpeed = clockSpeed;
    this.timings = timings;
    this.imageUrl = imageUrl;
    this.productUrl = productUrl;
  }
}
