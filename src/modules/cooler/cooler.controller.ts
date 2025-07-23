import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { CoolerService } from './cooler.service';
import { PagedEntity } from '../common/entities/paged.entity';
import { CPUCooler } from './entities/cooler.entity';
import { FilterCoolerOptionsDto } from './dto/cooler-filter.dto';
import { FilterOptionsCooler } from './entities/cooler-filter.entity';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('cooler')
export class CoolerController {
  constructor(private readonly coolerService: CoolerService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get a list of CPU coolers',
    description:
      'Returns a paginated list of CPU coolers based on filter options.',
  })
  @ApiExtraModels(PagedEntity, CPUCooler, FilterOptionsCooler)
  @ApiQuery({ type: FilterOptionsCooler })
  @ApiOkResponse({
    description: 'List of CPU coolers.',
    schema: {
      allOf: [{ $ref: getSchemaPath(PagedEntity) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(CPUCooler) },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error while fetching coolers.',
    type: InternalServerErrorException,
  })
  async findMany(
    @Query() options: FilterCoolerOptionsDto,
  ): Promise<PagedEntity<CPUCooler>> {
    const opt = new FilterOptionsCooler(
      options.page,
      options.perPage,
      options.cpuMpn,
      options.name,
    );
    return this.coolerService.findMany(opt);
  }

  @Get(':mpn')
  @ApiOperation({
    summary: 'Get a CPU cooler by its MPN',
    description: 'Returns a CPU cooler object based on the provided MPN.',
  })
  @ApiOkResponse({
    description: 'CPU cooler found.',
    type: CPUCooler,
  })
  @ApiNotFoundResponse({
    description: 'CPU cooler not found with the provided MPN.',
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error while fetching the cooler.',
    type: InternalServerErrorException,
  })
  async findOne(@Param('mpn') mpn: string): Promise<CPUCooler> {
    return this.coolerService.findOne(mpn);
  }
}
