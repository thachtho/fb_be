import { HttpService } from '@nestjs/axios';
export declare class DistanceService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getDistance(location: {
        lat: any;
        long: any;
        address: string | null;
    }): Promise<any>;
}
