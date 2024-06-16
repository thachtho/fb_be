import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

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
      const distance = this.regexDistance(data);

      if (distance && distance.length > 0) {
        return distance[0];
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  regexDistance(data: string) {
    const regex = /(\d+\.\d+ km)/g;
    const results = [];
    let match;
    // Sử dụng vòng lặp để tìm tất cả các kết quả phù hợp
    while ((match = regex.exec(data)) !== null) {
      results.push(match[1]);
    }

    return results;
  }
}
