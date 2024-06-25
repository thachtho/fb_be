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
    const message = 'Hà huy tập đi  Hà huy tập  15k'
    const data = getAddressReceiveAndDeliver(message)
    console.log(111, data)  
    // console.log(2222, address)

    // return this.distanceService.getLocaltionStart(address)
  }
}
