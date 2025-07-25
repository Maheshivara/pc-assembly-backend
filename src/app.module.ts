import { Module } from '@nestjs/common';
import { CpuModule } from './modules/cpu/cpu.module';
import { CoolerModule } from './modules/cooler/cooler.module';
import { PsuModule } from './modules/psu/psu.module';
import { GpuModule } from './modules/gpu/gpu.module';
import { StorageModule } from './modules/storage/storage.module';
import { MemoryModule } from './modules/memory/memory.module';
import { MotherboardModule } from './modules/motherboard/motherboard.module';

@Module({
  imports: [
    CpuModule,
    CoolerModule,
    PsuModule,
    GpuModule,
    MemoryModule,
    StorageModule,
    MotherboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
