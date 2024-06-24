import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly httpService;
    constructor(httpService: HttpService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: string): Promise<any>;
    findByPhone(phone: string): Promise<any>;
    accessById(id: string): Promise<any>;
    accessByPhone(phone: string): Promise<any>;
}
