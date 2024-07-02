import { Controller } from '@nestjs/common';
import { Public } from 'src/libs/guard/guard';

@Controller('distance')
@Public()
export class DistanceController {}
