import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { PaginationOptions } from 'src/modules/common/entities/paged.entity';

export class FilterOptionsCPU extends PaginationOptions {
  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Filter CPUs by name',
  })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name?: string;

  constructor(page: number = 1, perPage: number = 10, name?: string) {
    super(page, perPage);
    this.name = name;
  }
}
