import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('socket')
export class SocketProcessor {
    @Process('add-message')
    async transcode(job: Job<any>) {
        const { payload, func } = job.data || {};
        if (func) {
            console.log(11, payload)
          func();
        }
    }
}