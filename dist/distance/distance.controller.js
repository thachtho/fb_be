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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../libs/guard/guard");
const location_1 = require("../libs/utils/location");
const distance_service_1 = require("./distance.service");
let DistanceController = class DistanceController {
    constructor(distanceService) {
        this.distanceService = distanceService;
    }
    getDistance(body) {
        return this.distanceService.getDistance(body);
    }
    test() {
        const message = '143 vũ lăng đi phạm văn đồng phí 35';
        const data = (0, location_1.getAddressReceiveAndDeliver)(message);
        console.log(111, data);
    }
};
exports.DistanceController = DistanceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DistanceController.prototype, "getDistance", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DistanceController.prototype, "test", null);
exports.DistanceController = DistanceController = __decorate([
    (0, common_1.Controller)('distance'),
    (0, guard_1.Public)(),
    __metadata("design:paramtypes", [distance_service_1.DistanceService])
], DistanceController);
//# sourceMappingURL=distance.controller.js.map