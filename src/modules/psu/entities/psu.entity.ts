import { ApiProperty } from '@nestjs/swagger';

export class PSU {
  @ApiProperty({
    type: 'string',
    description: 'The Manufacturer Part Number (MPN) of the PSU',
  })
  mpn: string;

  @ApiProperty({
    type: 'string',
    description: 'The name of the PSU',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'The European Article Number (EAN) of the PSU',
  })
  ean?: string;

  @ApiProperty({
    type: 'string',
    description: 'The brand of the PSU',
  })
  brand?: string;

  @ApiProperty({
    type: 'number',
    description: 'The power output of the PSU in watts',
  })
  power?: number;

  @ApiProperty({
    type: 'string',
    description: 'The efficiency rating of the PSU',
  })
  efficiency?: string;

  @ApiProperty({
    type: 'string',
    description: 'The type of the PSU',
  })
  type?: string;

  @ApiProperty({
    type: 'number',
    description: 'The number of 8-pin connectors',
  })
  eightPin?: number;

  @ApiProperty({
    type: 'number',
    description: 'The number of 6-pin connectors',
  })
  sixPin?: number;

  @ApiProperty({
    type: 'string',
    description: 'The image URL of the PSU',
  })
  imageUrl?: string;

  @ApiProperty({
    type: 'string',
    description: 'The product URL of the PSU',
  })
  productUrl?: string;
  constructor(
    mpn: string,
    name?: string,
    ean?: string,
    brand?: string,
    power?: number,
    efficiency?: string,
    type?: string,
    eightPin?: number,
    sixPin?: number,
    imageUrl?: string,
    productUrl?: string,
  ) {
    this.mpn = mpn;
    this.name = name;
    this.ean = ean;
    this.brand = brand;
    this.power = power;
    this.efficiency = efficiency;
    this.type = type;
    this.eightPin = eightPin;
    this.sixPin = sixPin;
    this.imageUrl = imageUrl;
    this.productUrl = productUrl;
  }
}
