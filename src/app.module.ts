import { Module } from '@nestjs/common';
import { CpuModule } from './modules/cpu/cpu.module';
import { CoolerModule } from './modules/cooler/cooler.module';
import { PsuModule } from './modules/psu/psu.module';
import { GpuModule } from './modules/gpu/gpu.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [CpuModule, CoolerModule, PsuModule, GpuModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
