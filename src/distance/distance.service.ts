import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { lastValueFrom } from 'rxjs';
import { BASE_URL_GOOGLE } from 'src/libs/constant';
import { regexUrlGoogleMap } from 'src/libs/utils/regex';
import { regexDistance } from 'src/utils/distance';

@Injectable()
export class DistanceService {
  page = null;
  constructor(private readonly httpService: HttpService) {
    // this.newPage()
  }

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

  async newPage() {
    const url = `https://www.google.com/maps/dir/15+L%C3%AA+%C4%90%C3%ACnh+L%C3%BD,+V%C4%A9nh+Trung,+Thanh+Kh%C3%AA,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/98+N%C3%BAi+Th%C3%A0nh,+H%C3%B2a+Thu%E1%BA%ADn+%C4%90%C3%B4ng,+Q.+H%E1%BA%A3i+Ch%C3%A2u,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/@16.0534401,108.2045236,15z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x314219b67b657b29:0x1e3e4206d380536f!2m2!1d108.2114681!2d16.0586823!1m5!1m1!1s0x314219c5df3f3ca9:0xfaa454de73422f44!2m2!1d108.2200109!2d16.0511845!3e0?entry=ttu`

    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    // Navigate the page to a URL.
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1280, height: 720 });
    this.page = page;
  }

  async createImageGoogleMap(fileName: string, start: string, end: string) {
    const page = await this.page;
    await page.evaluate(() => {
        const input: any = document.querySelector('#directions-searchbox-0 input.tactile-searchbox-input');
        if (input) {
            input.value = start;
            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
        }

        const input2: any = document.querySelector('#directions-searchbox-1 input.tactile-searchbox-input');
        if (input2) {
            input2.value = end;
            const event = new Event('input', { bubbles: true });
            input2.dispatchEvent(event);
        }
    });

    await new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, 200);
    })


    await page.evaluate(() => {
        const button: any = document.querySelector('button.mL3xi[aria-label="Tìm kiếm"]');
        if (button) {
            button.click();
        }
    });

    await page.screenshot({
        path: `./images/${fileName}.jpg`,
        clip: { x: 500, y: 0, width: 780, height: 720 }
    });

    console.log('tao anh thanh cong!!!!!!!!')
  }
}
