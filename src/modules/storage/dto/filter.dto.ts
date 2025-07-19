import { PartialType } from '@nestjs/mapped-types';
import { FilterStorageOptions } from '../entities/storage-filter.entity';

export class FilterStorageOptionsDto extends PartialType(
  FilterStorageOptions,
) {}
