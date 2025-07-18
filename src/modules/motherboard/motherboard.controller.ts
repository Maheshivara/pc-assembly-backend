import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { MotherboardService } from './motherboard.service';
import { FilterMotherboardOptionsDto } from './dto/filter.dto';
import { FilterMotherboardOptions } from './entities/motherboard-filter.entity';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { Motherboard } from './entities/motherboard.entity';
import { PagedEntity } from '../common/entities/paged.entity';

@Controller('motherboard')
export class MotherboardController {
  constructor(private readonly motherboardService: MotherboardService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get a list of motherboards with optional filters',
    description:
      'Retrieve a paginated list of motherboards with optional filtering options.',
  })
  @ApiExtraModels(PagedEntity, FilterMotherboardOptions, Motherboard)
  @ApiQuery({ type: FilterMotherboardOptions })
  @ApiOkResponse({
    description: 'List of motherboards.',
    schema: {
      allOf: [{ $ref: getSchemaPath(PagedEntity) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(Motherboard) },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No motherboards found matching the filter criteria.',
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    type: InternalServerErrorException,
  })
  async findMany(@Query() filterOptions: FilterMotherboardOptionsDto) {
    const options = new FilterMotherboardOptions(
      filterOptions.page,
      filterOptions.perPage,
      filterOptions.name,
      filterOptions.socket,
      filterOptions.cpuMpn,
      filterOptions.formFactor,
    );
    return this.motherboardService.findMany(options);
  }

  @Get(':mpn')
  @ApiOperation({
    summary: 'Get a motherboard by its Manufacturer Part Number (MPN)',
    description: 'Retrieve a motherboard by its unique MPN.',
  })
  @ApiOkResponse({
    description: 'Motherboard details.',
    type: Motherboard,
  })
  @ApiNotFoundResponse({
    description: 'Motherboard not found.',
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
    type: InternalServerErrorException,
  })
  async findOne(@Param('mpn') mpn: string) {
    return this.motherboardService.findOne(mpn);
  }
}
