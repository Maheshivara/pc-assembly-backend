import { PartialType } from '@nestjs/mapped-types';
import { FilterOptionsCPU } from '../entities/cpu-filter.entity';

export class FilterCpuOptionsDto extends PartialType(FilterOptionsCPU) {}
