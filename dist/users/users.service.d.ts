import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
export declare class UsersService {
    private readonly httpService;
    constructor(httpService: HttpService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): void;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    findByPhone(phone: string): Promise<any>;
}
