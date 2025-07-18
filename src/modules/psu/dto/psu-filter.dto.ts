import { PartialType } from '@nestjs/mapped-types';
import { FilterOptionsPSU } from '../entities/psu-filter.entity';

export class FilterOptionsPSUDto extends PartialType(FilterOptionsPSU) {}
