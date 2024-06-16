import { DistanceService } from './distance.service';
export declare class DistanceController {
    private readonly distanceService;
    constructor(distanceService: DistanceService);
    getDistance(body: {
        lat: any;
        long: any;
        address: string | null;
    }): Promise<any>;
}
