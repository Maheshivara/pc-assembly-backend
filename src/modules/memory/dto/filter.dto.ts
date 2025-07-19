import { PartialType } from '@nestjs/mapped-types';
import { FilterMemoryOptions } from '../entities/memory-filter.entity';

export class FilterMemoryOptionsDto extends PartialType(FilterMemoryOptions) {}
