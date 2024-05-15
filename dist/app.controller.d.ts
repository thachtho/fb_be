import { AppService } from './app.service';
import { Message } from './Post/Post';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getPost(): Message[];
}
