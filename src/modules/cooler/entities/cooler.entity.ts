import { ApiProperty } from '@nestjs/swagger';

export class CPUCooler {
  @ApiProperty({
    type: 'string',
    description: 'Manufacturer Part Number (MPN) of the cooler',
  })
  mpn: string;

  @ApiProperty({
    type: 'string',
    description: 'Name of the cooler',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'European Article Number (EAN) of the cooler',
  })
  ean?: string;

  @ApiProperty({
    type: 'string',
    description: 'Universal Product Code (UPC) of the cooler',
  })
  upc?: string;

  @ApiProperty({
    type: 'string',
    description: 'Brand of the cooler',
  })
  brand?: string;

  @ApiProperty({
    type: 'string',
    description: 'Socket compatibility of the cooler',
  })
  sockets?: string;

  @ApiProperty({
    type: 'number',
    description: 'Height of the cooler in mm',
  })
  height?: number;

  @ApiProperty({
    type: 'number',
    description: 'Thermal Design Power (TDP) of the cooler in watts',
  })
  tdp?: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of fans with a diameter of 80mm',
  })
  eightMm?: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of fans with a diameter of 92mm',
  })
  ninetyTwoMm?: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of fans with a diameter of 120mm',
  })
  oneHundredTwentyMm?: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of fans with a diameter of 140mm',
  })
  oneHundredFortyMm?: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of fans with a diameter of 200mm',
  })
  twoHundredMm?: number;

  @ApiProperty({
    type: 'boolean',
    description: 'Whether the cooler has an additional fan',
  })
  adicionalFan?: boolean;

  @ApiProperty({
    type: 'string',
    description: 'Image URL of the cooler',
  })
  imageUrl?: string;

  @ApiProperty({
    type: 'string',
    description: 'Product URL of the cooler',
  })
  productUrl?: string;

  constructor(
    mpn: string,
    name?: string,
    ean?: string,
    upc?: string,
    brand?: string,
    sockets?: string,
    height?: number,
    tdp?: number,
    eightMm?: number,
    ninetyTwoMm?: number,
    oneHundredTwentyMm?: number,
    oneHundredFortyMm?: number,
    twoHundredMm?: number,
    adicionalFan?: boolean,
    imageUrl?: string,
    productUrl?: string,
  ) {
    this.mpn = mpn;
    this.name = name;
    this.ean = ean;
    this.upc = upc;
    this.brand = brand;
    this.sockets = sockets;
    this.height = height;
    this.tdp = tdp;
    this.eightMm = eightMm;
    this.ninetyTwoMm = ninetyTwoMm;
    this.oneHundredTwentyMm = oneHundredTwentyMm;
    this.oneHundredFortyMm = oneHundredFortyMm;
    this.twoHundredMm = twoHundredMm;
    this.adicionalFan = adicionalFan;
    this.imageUrl = imageUrl;
    this.productUrl = productUrl;
  }
}
