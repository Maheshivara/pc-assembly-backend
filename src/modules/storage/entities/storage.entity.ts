import { ApiProperty } from '@nestjs/swagger';
export class Storage {
  @ApiProperty({ description: 'Manufacturer Part Number' })
  mpn: string;

  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'European Article Number' })
  ean: string;

  @ApiProperty({ description: 'Type of storage (e.g., SSD, HDD)' })
  type: string;

  @ApiProperty({ description: 'Form factor of the storage device (e.g., M.2)' })
  formFactor: string;

  @ApiProperty({ description: 'Brand of the storage device' })
  brand: string;

  @ApiProperty({ description: 'Protocol used (e.g., SATA, NVMe)' })
  protocol: string;

  @ApiProperty({ description: 'Storage capacity in GB' })
  capacity: number;

  @ApiProperty({ description: 'URL of the product image' })
  imageUrl?: string;

  @ApiProperty({ description: 'URL to the product page' })
  productUrl?: string;

  constructor(
    mpn: string,
    name: string,
    ean: string,
    type: string,
    formFactor: string,
    brand: string,
    protocol: string,
    capacity: number,
    imageUrl?: string,
    productUrl?: string,
  ) {
    this.mpn = mpn;
    this.name = name;
    this.ean = ean;
    this.type = type;
    this.formFactor = formFactor;
    this.brand = brand;
    this.protocol = protocol;
    this.capacity = capacity;
    this.imageUrl = imageUrl;
    this.productUrl = productUrl;
  }
}
