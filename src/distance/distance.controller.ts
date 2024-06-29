import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/libs/guard/guard';
import { getAddressReceiveAndDeliver, getFullAddress } from 'src/libs/utils/location';
import { DistanceService } from './distance.service';

@Controller('distance')
@Public()
export class DistanceController {
  constructor(private readonly distanceService: DistanceService) {}

  @Post()
  getDistance(@Body() body: { lat: any; long: any; address: string | null }) {
    return this.distanceService.getDistance(body);
  }

  @Get()
  async test() {
    const message = 'Nhận 35 phạm Hùng. Giao 95/15 bà huyện thanh quan. Phí 20k. Đi liền. Ứng 149k'
    const { deliver, receive } = getAddressReceiveAndDeliver(message)
    const [locationStart, locationEnd] = await Promise.all([
      this.distanceService.getLocaltionStart(receive),
      this.distanceService.getLocaltionStart(deliver)
  ])

    console.log(2222, locationStart, locationEnd)

    // return this.distanceService.getLocaltionStart(address)
  }
}
