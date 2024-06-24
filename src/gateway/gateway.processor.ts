import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('socket')
export class SocketProcessor {
    @Process('add-message')
    async transcode(job: Job<any>) {
        const { payload, server } = job.data || {}
        void server?.emit('postMessage', payload);
    }
}