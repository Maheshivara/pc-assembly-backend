import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PagedEntity<T> {
  @ApiProperty({
    type: 'array',
    items: { type: 'object' },
    description: 'List of items in the current page',
  })
  items: T[];

  @ApiProperty({
    type: 'number',
    description: 'Total number of items available',
  })
  total: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of items per page',
  })
  perPage: number;

  @ApiProperty({
    type: 'number',
    description: 'Current page number',
  })
  page: number;
  constructor(items: T[], total: number, perPage: number, page: number) {
    this.items = items;
    this.total = total;
    this.perPage = perPage;
    this.page = page;
  }
}

export class PaginationOptions {
  @ApiProperty({
    type: 'number',
    description: 'Page number for pagination',
    default: 1,
    minimum: 1,
    required: false,
  })
  @IsInt({ message: 'Page must be a positive number.' })
  @Min(1, { message: 'Page must be at least 1.' })
  @Transform(({ value }) => parseInt(String(value), 10))
  page: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of items per page',
    default: 10,
    minimum: 10,
    maximum: 100,
    required: false,
  })
  @IsInt({ message: 'Per page must be a positive number.' })
  @Min(10, { message: 'Per page must be at least 10.' })
  @Max(100, { message: 'Per page must be at most 100.' })
  @Transform(({ value }) => parseInt(String(value), 10))
  perPage: number;

  constructor(page: number = 1, perPage: number = 10) {
    this.page = page;
    this.perPage = perPage;
  }

  take(): number {
    return this.perPage;
  }

  skip(): number {
    return (this.page - 1) * this.perPage;
  }
}
