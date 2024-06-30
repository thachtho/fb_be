import { Processor } from '@nestjs/bull';
@Processor('socket')
export class SocketProcessor {}