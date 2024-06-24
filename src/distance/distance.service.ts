import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BASE_URL_GOOGLE } from 'src/libs/constant';
import { regexUrlGoogleMap } from 'src/libs/utils/regex';
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
      return null;
    }
  }

  async getLocaltionStart(address: string) {
    const addressEncode = encodeURIComponent(address);

    try {
      const api = this.httpService.get(
        `${BASE_URL_GOOGLE}/maps/place/${addressEncode}`,
      );

      const response = await (await lastValueFrom(api))?.data
      
      if (response) {
        const url = regexUrlGoogleMap(response)
        const dataArr = url.split('/')
        const location = dataArr[7].split(',');
        const latitude = location[0].replace('@', '');
        const longitude = location[1]
        const locationA = { latitude, longitude }
        
        return locationA;
      }
    } catch (error) {
      return null
    }
  }
}
