import { Module } from '@nestjs/common';
import { PsuService } from './psu.service';
import { PsuController } from './psu.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PsuService],
  controllers: [PsuController],
})
export class PsuModule {}
