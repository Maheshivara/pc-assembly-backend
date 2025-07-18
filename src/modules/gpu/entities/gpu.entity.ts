import { ApiProperty } from '@nestjs/swagger';

export class GPU {
  @ApiProperty({ description: 'The unique MPN of the GPU' })
  mpn: string;

  @ApiProperty({ description: 'The name of the GPU', required: false })
  name?: string;

  @ApiProperty({ description: 'The EAN code', required: false })
  ean?: string;

  @ApiProperty({ description: 'The brand of the GPU', required: false })
  brand?: string;

  @ApiProperty({ description: 'The length of the GPU in mm', type: Number })
  length?: number;

  @ApiProperty({ description: 'The width in slots', type: Number })
  widthSlots?: number;

  @ApiProperty({ description: 'Number of 8-pin connectors', type: Number })
  eightPin?: number;

  @ApiProperty({ description: 'Number of 6-pin connectors', type: Number })
  sixPin?: number;

  @ApiProperty({ description: 'Number of HDMI ports', type: Number })
  hdmi?: number;

  @ApiProperty({ description: 'Number of DisplayPort ports', type: Number })
  dp?: number;

  @ApiProperty({ description: 'Number of DVI ports', type: Number })
  dvi?: number;

  @ApiProperty({ description: 'Number of VGA ports', type: Number })
  vga?: number;

  @ApiProperty({ description: 'Boost clock speed (MHz)', type: Number })
  boostClockSpeed?: number;

  @ApiProperty({ description: 'VRAM size (MB)', type: Number })
  vram?: number;

  @ApiProperty({ description: 'Memory clock speed (MHz)', type: Number })
  memoryClockSpeed?: number;

  @ApiProperty({ description: 'Thermal Design Power (TDP)', type: Number })
  tdp?: number;

  @ApiProperty({ description: 'Sync technology' })
  sync?: string;

  @ApiProperty({ description: 'Image URL' })
  imageUrl?: string;

  @ApiProperty({ description: 'Product URL' })
  productUrl?: string;

  constructor(
    mpn: string,
    name?: string,
    ean?: string,
    brand?: string,
    length?: number,
    widthSlots?: number,
    eightPin?: number,
    sixPin?: number,
    hdmi?: number,
    dp?: number,
    dvi?: number,
    vga?: number,
    boostClockSpeed?: number,
    vram?: number,
    memoryClockSpeed?: number,
    tdp?: number,
    sync?: string,
    imageUrl?: string,
    productUrl?: string,
  ) {
    this.mpn = mpn;
    this.name = name;
    this.ean = ean;
    this.brand = brand;
    this.length = length;
    this.widthSlots = widthSlots;
    this.eightPin = eightPin;
    this.sixPin = sixPin;
    this.hdmi = hdmi;
    this.dp = dp;
    this.dvi = dvi;
    this.vga = vga;
    this.boostClockSpeed = boostClockSpeed;
    this.vram = vram;
    this.memoryClockSpeed = memoryClockSpeed;
    this.tdp = tdp;
    this.sync = sync;
    this.imageUrl = imageUrl;
    this.productUrl = productUrl;
  }
}
