import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DistanceService } from 'src/distance/distance.service';
import { getAddressReceiveAndDeliver, getFullAddress } from 'src/libs/utils/location';
import { AppGateway } from './app.gateway';


@Processor('socket')
export class SocketProcessor {
    constructor(
        private readonly distanceService: DistanceService,
        private readonly gateWay: AppGateway
    ) {

    }
    @Process('add-message')
    async transcode(job: Job<any>) {
        const { payload } = job.data || {};

        if (payload) {
            const { receive, deliver } = getAddressReceiveAndDeliver(payload.content);

            if (receive && !deliver){
                const locationStart = await this.distanceService.getLocaltionStart(receive)
                payload.locationStart = locationStart
                return this.gateWay.postMessage(payload)
            }

            if (receive && deliver) {
                const [locationStart, locationEnd] = await Promise.all([
                    this.distanceService.getLocaltionStart(receive),
                    this.distanceService.getLocaltionStart(deliver)
                ])
                payload.locationStart = locationStart
                payload.locationEnd = locationEnd

                return this.gateWay.postMessage(payload)
            }
        }
    }
}