import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { PaginationOptions } from 'src/modules/common/entities/paged.entity';

export class FilterOptionsCooler extends PaginationOptions {
  @ApiProperty({
    type: 'string',
    description: 'Filter coolers by CPU MPN (case insensitive)',
    required: false,
  })
  @IsString()
  @MinLength(3, { message: 'MPN must be at least 3 characters long' })
  cpuMpn?: string;

  @ApiProperty({
    type: 'string',
    description: 'Filter coolers by name (case insensitive)',
    required: false,
    example: 'Cooler Master',
    minLength: 3,
  })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name?: string;

  constructor(
    page: number = 1,
    perPage: number = 10,
    cpuMpn?: string,
    name?: string,
  ) {
    super(page, perPage);
    this.cpuMpn = cpuMpn;
    this.name = name;
  }
}
