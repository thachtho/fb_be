import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DistanceService } from 'src/distance/distance.service';
import { AppGateway } from './app.gateway';
import { getAddress } from 'src/libs/utils/location';

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
            const address = getAddress(payload.content);
            const locationStart = await this.distanceService.getLocaltionStart(address)
            payload.location = locationStart
            return this.gateWay.postMessage(payload)
        }
    }
}