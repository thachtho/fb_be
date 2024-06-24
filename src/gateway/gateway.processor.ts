import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DistanceService } from 'src/distance/distance.service';

@Processor('socket')
export class SocketProcessor {
    constructor(
        private readonly distanceService: DistanceService,
    ) {

    }
    @Process('add-message')
    async transcode(job: Job<any>) {
        const { address } = job.data || {};
        if (address) {
            const locationStart = await this.distanceService.getLocaltionStart(address)
            console.log(333333333333333, locationStart)
        }
    }
}