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
  test() {
    const message = 'Nhận đàm văn lễ đi huỳnh văn nghệ. Ứng 520k phí 60k ( bàn k + nệm xốp mỏng 1,6m)'
    const data = getAddressReceiveAndDeliver(message)
    console.log(111, data)  
    // console.log(2222, address)

    // return this.distanceService.getLocaltionStart(address)
  }
}
