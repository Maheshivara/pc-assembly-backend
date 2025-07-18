import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { MemoryService } from './memory.service';
import { FilterMemoryOptionsDto } from './dto/filter.dto';
import { FilterMemoryOptions } from './entities/memory-filter.entity';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { Memory } from './entities/memory.entity';
import { PagedEntity } from '../common/entities/paged.entity';

@Controller('memory')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get a list of memory modules with optional filters',
    description:
      'Retrieve memory modules with pagination and filtering options.',
  })
  @ApiExtraModels(FilterMemoryOptions, Memory, PagedEntity)
  @ApiQuery({ type: FilterMemoryOptions })
  @ApiOkResponse({
    description: 'List of memory modules.',
    schema: {
      allOf: [{ $ref: getSchemaPath(PagedEntity) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(Memory) },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No memory modules found matching the filter criteria.',
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    type: InternalServerErrorException,
  })
  async findMany(@Query() filterOptions: FilterMemoryOptionsDto) {
    const options = new FilterMemoryOptions(
      filterOptions.page,
      filterOptions.perPage,
      filterOptions.name,
      filterOptions.mbMpn,
      filterOptions.type,
    );
    return this.memoryService.findMany(options);
  }
  @Get(':mpn')
  @ApiOperation({
    summary: 'Get a memory module by its MPN',
    description: 'Retrieve a specific memory module using its MPN.',
  })
  @ApiOkResponse({
    description: 'Memory module details.',
    type: Memory,
  })
  @ApiNotFoundResponse({
    description: 'Memory module not found.',
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    type: InternalServerErrorException,
  })
  async findOne(@Param('mpn') mpn: string): Promise<Memory> {
    return this.memoryService.findOne(mpn);
  }
}
