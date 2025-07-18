import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GpuService } from './gpu.service';
import { GpuController } from './gpu.controller';

@Module({
  imports: [PrismaModule],
  providers: [GpuService],
  controllers: [GpuController],
})
export class GpuModule {}
