import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('socket')
export class SocketProcessor {
    @Process('add-message')
    async transcode(job: Job<unknown>) {
        console.log(1111, job.data)
    }
}