import { HttpService } from '@nestjs/axios';
export declare class DistanceService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getDistance(): Promise<any[]>;
    regexDistance(data: string): any[];
}
