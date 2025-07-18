import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PagedEntity } from '../common/entities/paged.entity';
import { CPU } from './entities/cpu.entity';
import { FilterCpuOptionsDto } from './dto/cpu-filter.dto';
import { FilterOptionsCPU } from './entities/cpu-filter.entity';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get a list of CPUs',
    description: 'Returns a paginated list of CPUs based on filter options.',
  })
  @ApiExtraModels(PagedEntity, CPU, FilterOptionsCPU)
  @ApiQuery({ type: FilterOptionsCPU })
  @ApiOkResponse({
    description: 'List of CPU coolers.',
    schema: {
      allOf: [{ $ref: getSchemaPath(PagedEntity) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(CPU) },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: 'No CPUs found matching the filter criteria.',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
    description: 'Internal server error while fetching CPUs.',
  })
  async findMany(
    @Query() options: FilterCpuOptionsDto,
  ): Promise<PagedEntity<CPU>> {
    const opt = new FilterOptionsCPU(
      options.page,
      options.perPage,
      options.name,
    );
    return this.cpuService.findMany(opt);
  }

  @Get(':mpn')
  @ApiOperation({
    summary: 'Get a CPU by its MPN',
    description: 'Returns a CPU object based on the provided MPN.',
  })
  @ApiOkResponse({
    description: 'CPU found.',
    type: CPU,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: 'CPU not found with the provided MPN.',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
    description: 'Internal server error while fetching CPU.',
  })
  async findOne(@Param('mpn') mpn: string): Promise<CPU> {
    return this.cpuService.findOne(mpn);
  }
}
