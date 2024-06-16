import { DistanceService } from './distance.service';
export declare class DistanceController {
    private readonly distanceService;
    constructor(distanceService: DistanceService);
    getDistance(): Promise<any[]>;
}
