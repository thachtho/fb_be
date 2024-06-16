import { Controller, Get } from '@nestjs/common';
import { DistanceService } from './distance.service';

@Controller('distance')
export class DistanceController {
  constructor(private readonly distanceService: DistanceService) {}

  @Get()
  getDistance() {
    return this.distanceService.getDistance();
  }
}
