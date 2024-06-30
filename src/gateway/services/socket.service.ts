import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AppGateway, Message } from "../app.gateway";
import { DistanceService } from "src/distance/distance.service";
import { calculateDistance, calculateTravelTime, getAddressReceiveAndDeliver } from "src/libs/utils/location";

@Injectable()
export class SocketService {
    constructor(
        private readonly distanceService: DistanceService,
        private readonly gateWay: AppGateway
    ) {}

    @OnEvent('post.created')
    async handleAddPost(payload: Message) {
        if (!payload) return;
        const { receive, deliver } = getAddressReceiveAndDeliver(payload.content);

        if (!receive) return; 

        if (!deliver){
        const locationStart = await this.distanceService.getLocaltionStart(receive)
        payload.locationStart = locationStart
        } else {
            console.log(1111, payload.content)
            const [locationStart, locationEnd] = await Promise.all([
                this.distanceService.getLocaltionStart(receive),
                this.distanceService.getLocaltionStart(deliver)
            ])
            console.log(22222, locationStart)
            console.log(33333, locationEnd)
            console.log('=================')

            if ((locationStart && (locationStart.latitude && locationStart.longitude))
                && (locationEnd && (locationEnd.latitude && locationEnd.longitude))
            ) {
                const distanceAB = calculateDistance(locationStart, locationEnd)
                if (distanceAB) {
                    payload.distanceAB = distanceAB || null    
                    const time = calculateTravelTime(distanceAB, 40)
                    payload.time = time || null      
                }
            }

            payload.locationStart = locationStart
            payload.locationEnd = locationEnd     
        }

        return this.gateWay.postMessage(payload)
    }
}