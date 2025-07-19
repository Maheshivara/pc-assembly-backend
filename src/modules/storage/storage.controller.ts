import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FilterStorageOptionsDto } from './dto/filter.dto';
import { FilterStorageOptions } from './entities/storage-filter.entity';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { Storage } from './entities/storage.entity';
import { PagedEntity } from '../common/entities/paged.entity';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('')
  @ApiOperation({ summary: 'Get paginated list of storage devices' })
  @ApiExtraModels(FilterStorageOptions, Storage, PagedEntity)
  @ApiQuery({
    type: FilterStorageOptions,
  })
  @ApiOkResponse({
    description: 'Returns a paginated list of storage devices',
    schema: {
      allOf: [{ $ref: getSchemaPath(PagedEntity) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(Storage) },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorException,
  })
  async findMany(@Query() filterOptions: FilterStorageOptionsDto) {
    const options = new FilterStorageOptions(
      filterOptions.page,
      filterOptions.perPage,
      filterOptions.name,
      filterOptions.type,
      filterOptions.formFactor,
      filterOptions.protocol,
    );
    return this.storageService.findMany(options);
  }

  @Get(':mpn')
  @ApiOperation({ summary: 'Get storage device by MPN' })
  @ApiOkResponse({
    description: 'Returns the storage device with the specified MPN',
    type: Storage,
  })
  @ApiNotFoundResponse({
    description: 'Storage device not found',
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorException,
  })
  async findOne(@Param('mpn') mpn: string): Promise<Storage> {
    return this.storageService.findOne(mpn);
  }
}
