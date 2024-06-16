import { Module } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { DistanceController } from './distance.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  controllers: [DistanceController],
  providers: [DistanceService],
})
export class DistanceModule {}
