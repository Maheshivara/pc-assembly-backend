import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PsuService } from './psu.service';
import { FilterOptionsPSU } from './entities/psu-filter.entity';
import { PagedEntity } from '../common/entities/paged.entity';
import { PSU } from './entities/psu.entity';
import { FilterOptionsPSUDto } from './dto/psu-filter.dto';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('psu')
export class PsuController {
  constructor(private readonly psuService: PsuService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get a list of PSUs',
    description: 'Returns a paginated list of PSUs based on filter options.',
  })
  @ApiExtraModels(PagedEntity, PSU, FilterOptionsPSU)
  @ApiQuery({ type: FilterOptionsPSU })
  @ApiOkResponse({
    description: 'List of PSUs.',
    schema: {
      allOf: [{ $ref: getSchemaPath(PagedEntity) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(PSU) },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: 'No PSUs found matching the filter criteria.',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
    description: 'Internal server error while fetching PSUs.',
  })
  async findMany(
    @Query() filterOptions: FilterOptionsPSUDto,
  ): Promise<PagedEntity<PSU>> {
    const options = new FilterOptionsPSU(
      filterOptions.page,
      filterOptions.perPage,
      filterOptions.tdp,
      filterOptions.getUncertain,
      filterOptions.type,
      filterOptions.name,
    );
    return this.psuService.findMany(options);
  }

  @Get(':mpn')
  @ApiOperation({
    summary: 'Get a PSU by its MPN',
    description: 'Returns a PSU object matching the provided MPN.',
  })
  @ApiOkResponse({
    description: 'PSU found.',
    type: PSU,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: 'No PSU found with the given MPN.',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
    description: 'Internal server error while fetching PSU.',
  })
  async findOne(@Param('mpn') mpn: string): Promise<PSU> {
    return this.psuService.findOne(mpn);
  }
}
