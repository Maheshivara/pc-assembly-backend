import { Module } from '@nestjs/common';
import { CoolerService } from './cooler.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CoolerController } from './cooler.controller';

@Module({
  imports: [PrismaModule],
  providers: [CoolerService],
  controllers: [CoolerController],
})
export class CoolerModule {}
