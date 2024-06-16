import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DistanceService {
  constructor(private readonly httpService: HttpService) {}
  async getDistance() {
    try {
      const api = this.httpService.get(
        'https://www.google.com/maps/dir/16.0540029,+108.2090995/52%20Nguy%E1%BB%85n%20S%C6%A1n%2C%20Ho%C3%A0%20C%C6%B0%E1%BB%9Dng%20Nam%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%2C%20Vi%E1%BB%87t%20Nam',
      );

      const response = await lastValueFrom(api);
      const data = JSON.stringify(response.data).substring(0, 40000);
      const distance = this.regexDistance(data);

      return distance;
    } catch (error) {}
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
