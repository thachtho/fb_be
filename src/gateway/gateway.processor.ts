import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('socket')
export class SocketProcessor {
    @Process('add-message')
    async transcode(job: Job<any>) {
        const { address } = job.data || {};
        if (address) {
            console.log(333333333333333, address)
        }
    }
}