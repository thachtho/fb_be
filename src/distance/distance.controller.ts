import { Body, Controller, Get, Post } from '@nestjs/common';
import { DistanceService } from './distance.service';

@Controller('distance')
export class DistanceController {
  constructor(private readonly distanceService: DistanceService) {}

  @Post()
  getDistance(@Body() body: { lat: any; long: any; address: string | null }) {
    return this.distanceService.getDistance(body);
  }

  @Get()
  test() {
    return this.distanceService.getLocaltionStart('78 Huỳnh Văn Nghệ, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng')
  }
}
