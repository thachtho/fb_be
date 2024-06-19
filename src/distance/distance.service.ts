import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { regexDistance } from 'src/utils/distance';

@Injectable()
export class DistanceService {
  constructor(private readonly httpService: HttpService) {}
  async getDistance(location: { lat: any; long: any; address: string | null }) {
    if (!location) {
      return null;
    }
    const { lat, long, address } = location;
    const addressEncode = encodeURIComponent(address);

    try {
      const api = this.httpService.get(
        `https://www.google.com/maps/dir/${lat},+${long}/${addressEncode}`,
      );

      const response = await lastValueFrom(api);
      const data = JSON.stringify(response.data).substring(0, 40000);

      const distance = regexDistance(data);
      if (distance && distance.length > 0) {
        return distance[0];
      }
      return null;
    } catch (error) {
      console.log(3333, error)
      return null;
    }
  }
}
