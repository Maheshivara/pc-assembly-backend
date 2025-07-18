import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { PaginationOptions } from 'src/modules/common/entities/paged.entity';
import { PSUType } from '../enum/psu-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FilterOptionsPSU extends PaginationOptions {
  @ApiProperty({
    type: 'string',
    description: 'The name of the PSU',
    required: false,
  })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name?: string;

  @ApiProperty({
    type: 'number',
    description: 'The minimum thermal design power (TDP) of the PSU in watts',
    required: false,
  })
  @IsInt()
  @Min(0, { message: 'TDP must be a non-negative number.' })
  @Transform(({ value }) => parseInt(String(value), 10))
  tdp: number;

  @ApiProperty({
    type: 'string',
    enum: PSUType,
    enumName: 'PSUType',
    description: 'The type of the PSU',
    required: false,
  })
  @IsEnum(PSUType, { message: 'Invalid PSU type.' })
  type?: PSUType;

  @ApiProperty({
    type: 'boolean',
    description: 'Whether to include uncertain PSUs in the results',
    required: false,
    default: false,
  })
  @IsBoolean()
  @Transform(({ value }) => String(value).toLowerCase() === 'true')
  getUncertain: boolean;

  constructor(
    page: number = 1,
    perPage: number = 10,
    tdp: number = 0,
    getUncertain: boolean = false,
    type?: PSUType,
    name?: string,
  ) {
    super(page, perPage);
    this.name = name;
    this.tdp = tdp;
    this.type = type;
    this.getUncertain = getUncertain;
  }
}
