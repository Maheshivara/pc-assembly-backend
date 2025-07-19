import { PaginationOptions } from 'src/modules/common/entities/paged.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { StorageType } from '../enum/storate-type.enum';
import { StorageProtocol } from '../enum/storage-protocol.enum';
import { StorageFormFactor } from '../enum/storage-formFactor.enum';
export class FilterStorageOptions extends PaginationOptions {
  @ApiProperty({
    description: 'Optional filter by storage name.',
    required: false,
  })
  @IsString()
  @MinLength(3, { message: 'Storage name must be at least 3 characters long.' })
  name?: string;

  @ApiProperty({
    description: 'Optional filter by storage type.',
    enum: StorageType,
    enumName: 'StorageType',
    required: false,
  })
  @IsEnum(StorageType, { message: 'Invalid storage type.' })
  type?: StorageType;

  @ApiProperty({
    description: 'Optional filter by form factor.',
    enum: StorageFormFactor,
    enumName: 'StorageFormFactor',
    required: false,
  })
  @IsEnum(StorageFormFactor, { message: 'Invalid storage form factor.' })
  formFactor?: StorageFormFactor;

  @ApiProperty({
    description: 'Optional filter by storage protocol.',
    enum: StorageProtocol,
    enumName: 'StorageProtocol',
    required: false,
  })
  @IsEnum(StorageProtocol, { message: 'Invalid storage protocol.' })
  protocol?: StorageProtocol;

  constructor(
    page: number = 1,
    perPage: number = 10,
    name?: string,
    type?: StorageType,
    formFactor?: StorageFormFactor,
    protocol?: StorageProtocol,
  ) {
    super(page, perPage);
    this.name = name;
    this.type = type;
    this.formFactor = formFactor;
    this.protocol = protocol;
  }
}
