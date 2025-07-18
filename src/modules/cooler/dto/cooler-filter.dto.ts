import { PartialType } from '@nestjs/mapped-types';
import { FilterOptionsCooler } from '../entities/cooler-filter.entity';

export class FilterCoolerOptionsDto extends PartialType(FilterOptionsCooler) {}
