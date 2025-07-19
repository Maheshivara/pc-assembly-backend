import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { PaginationOptions } from 'src/modules/common/entities/paged.entity';

export class FilterMotherboardOptions extends PaginationOptions {
  @ApiProperty({ description: 'Motherboard name', required: false })
  @IsString()
  @MinLength(3, {
    message: 'Motherboard name must be at least 3 characters long',
  })
  name?: string;

  @ApiProperty({ description: 'CPU socket type', required: false })
  @IsString()
  socket?: string;

  @ApiProperty({ description: 'CPU Manufacturer Part Number', required: false })
  @IsString()
  @MinLength(3, { message: 'CPU MPN must be at least 3 characters long' })
  cpuMpn?: string;

  @ApiProperty({ description: 'Motherboard form factor', required: false })
  @IsString()
  formFactor?: string;

  constructor(
    page: number = 1,
    perPage: number = 10,
    name?: string,
    socket?: string,
    cpuMpn?: string,
    formFactor?: string,
  ) {
    super(page, perPage);
    this.name = name;
    this.socket = socket;
    this.cpuMpn = cpuMpn;
    this.formFactor = formFactor;
  }
}
