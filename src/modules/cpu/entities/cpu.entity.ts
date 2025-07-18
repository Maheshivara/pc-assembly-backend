import { ApiProperty } from '@nestjs/swagger';

export class CPU {
  @ApiProperty({
    type: 'string',
    description: 'The Manufacturer Part Number (MPN) of the CPU',
  })
  mpn: string;

  @ApiProperty({
    type: 'string',
    description: 'The name of the CPU',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'The European Article Number (EAN) of the CPU',
  })
  ean?: string;

  @ApiProperty({
    type: 'string',
    description: 'The brand of the CPU',
  })
  brand?: string;
  @ApiProperty({
    type: 'number',
    description: 'The number of cores in the CPU',
  })
  cores?: number;

  @ApiProperty({
    type: 'number',
    description: 'The number of threads in the CPU',
  })
  threads?: number;

  @ApiProperty({
    type: 'number',
    description: 'The base clock speed of the CPU in MHz',
  })
  speed?: number;

  @ApiProperty({
    type: 'number',
    description: 'The turbo clock speed of the CPU in MHz',
  })
  turboSpeed?: number;

  @ApiProperty({
    type: 'number',
    description: 'The thermal design power (TDP) of the CPU in watts',
  })
  tdp?: number;

  @ApiProperty({
    type: 'string',
    description: 'The socket type of the CPU',
  })
  socket?: string;

  @ApiProperty({
    type: 'string',
    description: 'The integrated graphics of the CPU',
  })
  graphics?: string;

  @ApiProperty({
    type: 'string',
    description: 'The image URL of the CPU',
  })
  imageUrl?: string;

  @ApiProperty({
    type: 'string',
    description: 'The product URL of the CPU',
  })
  productUrl?: string;
  constructor(
    mpn: string,
    name?: string,
    ean?: string,
    brand?: string,
    cores?: number,
    threads?: number,
    speed?: number,
    turboSpeed?: number,
    tdp?: number,
    socket?: string,
    graphics?: string,
    imageUrl?: string,
    productUrl?: string,
  ) {
    this.mpn = mpn;
    this.name = name;
    this.ean = ean;
    this.brand = brand;
    this.cores = cores;
    this.threads = threads;
    this.speed = speed;
    this.turboSpeed = turboSpeed;
    this.tdp = tdp;
    this.socket = socket;
    this.graphics = graphics;
    this.imageUrl = imageUrl;
    this.productUrl = productUrl;
  }
}
