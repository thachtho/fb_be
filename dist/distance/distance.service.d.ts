import { HttpService } from '@nestjs/axios';
export declare class DistanceService {
    private readonly httpService;
    page: any;
    constructor(httpService: HttpService);
    getDistance(location: {
        lat: any;
        long: any;
        address: string | null;
    }): Promise<any>;
    getLocaltionStart(address: string): Promise<{
        latitude: string;
        longitude: string;
    }>;
    newPage(): Promise<void>;
    createImageGoogleMap(fileName: string): Promise<void>;
}
