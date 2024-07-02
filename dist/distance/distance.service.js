"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const puppeteer_1 = require("puppeteer");
const rxjs_1 = require("rxjs");
const constant_1 = require("../libs/constant");
const regex_1 = require("../libs/utils/regex");
const distance_1 = require("../utils/distance");
let DistanceService = class DistanceService {
    constructor(httpService) {
        this.httpService = httpService;
        this.page = null;
        this.newPage();
    }
    async getDistance(location) {
        if (!location) {
            return null;
        }
        const { lat, long, address } = location;
        const addressEncode = encodeURIComponent(address);
        try {
            const api = this.httpService.get(`https://www.google.com/maps/dir/${lat},+${long}/${addressEncode}`);
            const response = await (0, rxjs_1.lastValueFrom)(api);
            const data = JSON.stringify(response.data).substring(0, 40000);
            const distance = (0, distance_1.regexDistance)(data);
            if (distance && distance.length > 0) {
                return distance[0];
            }
            return null;
        }
        catch (error) {
            return null;
        }
    }
    async getLocaltionStart(address) {
        const addressEncode = encodeURIComponent(address);
        try {
            const api = this.httpService.get(`${constant_1.BASE_URL_GOOGLE}/maps/place/${addressEncode}`);
            const response = await (await (0, rxjs_1.lastValueFrom)(api))?.data;
            if (response) {
                const url = (0, regex_1.regexUrlGoogleMap)(response);
                const dataArr = url.split('/');
                const location = dataArr[7].split(',');
                const latitude = location[0].replace('@', '');
                const longitude = location[1];
                const locationA = { latitude, longitude };
                return locationA;
            }
        }
        catch (error) {
            return null;
        }
    }
    async newPage() {
        const url = `https://www.google.com/maps/dir/15+L%C3%AA+%C4%90%C3%ACnh+L%C3%BD,+V%C4%A9nh+Trung,+Thanh+Kh%C3%AA,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/98+N%C3%BAi+Th%C3%A0nh,+H%C3%B2a+Thu%E1%BA%ADn+%C4%90%C3%B4ng,+Q.+H%E1%BA%A3i+Ch%C3%A2u,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/@16.0534401,108.2045236,15z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x314219b67b657b29:0x1e3e4206d380536f!2m2!1d108.2114681!2d16.0586823!1m5!1m1!1s0x314219c5df3f3ca9:0xfaa454de73422f44!2m2!1d108.2200109!2d16.0511845!3e0?entry=ttu`;
        const browser = await puppeteer_1.default.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.setViewport({ width: 1280, height: 720 });
        this.page = page;
    }
    async createImageGoogleMap(fileName, start, end) {
        const page = await this.page;
        await page.evaluate(() => {
            const input = document.querySelector('#directions-searchbox-0 input.tactile-searchbox-input');
            if (input) {
                input.value = start;
                const event = new Event('input', { bubbles: true });
                input.dispatchEvent(event);
            }
            const input2 = document.querySelector('#directions-searchbox-1 input.tactile-searchbox-input');
            if (input2) {
                input2.value = end;
                const event = new Event('input', { bubbles: true });
                input2.dispatchEvent(event);
            }
        });
        await new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 200);
        });
        await page.evaluate(() => {
            const button = document.querySelector('button.mL3xi[aria-label="Tìm kiếm"]');
            if (button) {
                button.click();
            }
        });
        await page.screenshot({
            path: `./images/${fileName}.jpg`,
            clip: { x: 500, y: 0, width: 780, height: 720 }
        });
    }
};
exports.DistanceService = DistanceService;
exports.DistanceService = DistanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], DistanceService);
//# sourceMappingURL=distance.service.js.map