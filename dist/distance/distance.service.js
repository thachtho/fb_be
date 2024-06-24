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
const rxjs_1 = require("rxjs");
const constant_1 = require("../libs/constant");
const regex_1 = require("../libs/utils/regex");
const distance_1 = require("../utils/distance");
let DistanceService = class DistanceService {
    constructor(httpService) {
        this.httpService = httpService;
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
            const response = (await (0, rxjs_1.lastValueFrom)(api))?.data;
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
};
exports.DistanceService = DistanceService;
exports.DistanceService = DistanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], DistanceService);
//# sourceMappingURL=distance.service.js.map