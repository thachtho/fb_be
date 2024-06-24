import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { BASE_URL_JSON_SERVER } from "src/libs/constant";

type URL = 'users' | 'usersOnline'

export abstract class JsonServer {
    constructor(
        protected readonly httpService: HttpService
    ) {}

    async create(dto: any, key: URL) {
        const api = this.httpService.post(
          `${BASE_URL_JSON_SERVER}/${key}`, dto
        );

        return (await lastValueFrom(api))?.data;
    }

    async findOne(id: string, key: URL) {
        const api = this.httpService.get(
          `${BASE_URL_JSON_SERVER}/${key}/${id}`
        );
      
        return (await lastValueFrom(api))?.data
    }

    async findAll(key: URL) {
        const api = this.httpService.get(
          `${BASE_URL_JSON_SERVER}/${key}`
        );
    
        return (await lastValueFrom(api))?.data;
    }

    async remove(id: string, key: URL) {
        const api = this.httpService.delete(
          `${BASE_URL_JSON_SERVER}/${key}/${id}`
        );
    
        return (await lastValueFrom(api))?.data;
    }

    async findByPhone(phone: string, key: URL) {
      const api = this.httpService.get(
        `${BASE_URL_JSON_SERVER}/${key}?phone=${phone}`
      );
  
      return (await lastValueFrom(api))?.data;
    }


    async query(query: string, key: URL) {
      const api = this.httpService.get(
        `${BASE_URL_JSON_SERVER}/${key}?${query}`
      );
  
      return (await lastValueFrom(api))?.data;
    }
}