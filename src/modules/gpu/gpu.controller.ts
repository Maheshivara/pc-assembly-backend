import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { GpuService } from './gpu.service';
import { FilterGPUOptionsDto } from './dto/filter.dto';
import { PagedEntity } from '../common/entities/paged.entity';
import { GPU } from './entities/gpu.entity';
import { FilterGPUOptions } from './entities/gpu-filter.entity';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('gpu')
export class GpuController {
  constructor(private readonly gpuService: GpuService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of GPUs',
    description: 'Returns a paginated list of GPUs based on filter options.',
  })
  @ApiExtraModels(PagedEntity, GPU, FilterGPUOptions)
  @ApiQuery({ type: FilterGPUOptions })
  @ApiOkResponse({
    description: 'List of GPUs.',
    schema: {
      allOf: [{ $ref: getSchemaPath(PagedEntity) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(GPU) },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No GPUs found matching the filter criteria.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  async findMany(
    @Query() options: FilterGPUOptionsDto,
  ): Promise<PagedEntity<GPU>> {
    const filterOptions = new FilterGPUOptions(
      options.page,
      options.perPage,
      options.name,
    );
    return this.gpuService.findMany(filterOptions);
  }

  @Get(':mpn')
  @ApiOperation({
    summary: 'Get a GPU by its MPN',
    description: 'Returns a GPU object based on the provided MPN.',
  })
  @ApiOkResponse({
    description: 'GPU object.',
    type: GPU,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: 'GPU not found.',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
    description: 'Internal server error.',
  })
  async findOne(@Param('mpn') mpn: string): Promise<GPU> {
    return this.gpuService.findOne(mpn);
  }
}
