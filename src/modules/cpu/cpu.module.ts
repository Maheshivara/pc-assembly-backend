import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CpuController } from './cpu.controller';

@Module({
  imports: [PrismaModule],
  providers: [CpuService],
  controllers: [CpuController],
})
export class CpuModule {}
