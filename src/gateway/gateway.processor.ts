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
            const { receive } = getAddressReceiveAndDeliver(payload.content);
            const locationStart = await this.distanceService.getLocaltionStart(receive)
            payload.location = locationStart
            return this.gateWay.postMessage(payload)
        }
    }
}