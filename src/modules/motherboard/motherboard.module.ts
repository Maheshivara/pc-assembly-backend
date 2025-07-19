import { Module } from '@nestjs/common';
import { MotherboardController } from './motherboard.controller';
import { MotherboardService } from './motherboard.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MotherboardController],
  providers: [MotherboardService],
})
export class MotherboardModule {}
