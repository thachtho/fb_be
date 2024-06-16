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
let DistanceService = class DistanceService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getDistance() {
        try {
            const api = this.httpService.get('https://www.google.com/maps/dir/16.0540029,+108.2090995/52%20Nguy%E1%BB%85n%20S%C6%A1n%2C%20Ho%C3%A0%20C%C6%B0%E1%BB%9Dng%20Nam%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%2C%20Vi%E1%BB%87t%20Nam');
            const response = await (0, rxjs_1.lastValueFrom)(api);
            const data = JSON.stringify(response.data).substring(0, 40000);
            const distance = this.regexDistance(data);
            return distance;
        }
        catch (error) { }
    }
    regexDistance(data) {
        const regex = /(\d+\.\d+ km)/g;
        const results = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
            results.push(match[1]);
        }
        return results;
    }
};
exports.DistanceService = DistanceService;
exports.DistanceService = DistanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], DistanceService);
//# sourceMappingURL=distance.service.js.map