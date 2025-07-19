import { PartialType } from '@nestjs/mapped-types';
import { FilterMotherboardOptions } from '../entities/motherboard-filter.entity';

export class FilterMotherboardOptionsDto extends PartialType(
  FilterMotherboardOptions,
) {}
