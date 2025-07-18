import { PartialType } from '@nestjs/mapped-types';
import { PaginationOptions } from '../entities/paged.entity';

export class PaginationOptionsDto extends PartialType(PaginationOptions) {}
