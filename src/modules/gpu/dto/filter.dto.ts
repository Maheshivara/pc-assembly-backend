import { PartialType } from '@nestjs/mapped-types';
import { FilterGPUOptions } from '../entities/gpu-filter.entity';

export class FilterGPUOptionsDto extends PartialType(FilterGPUOptions) {}
