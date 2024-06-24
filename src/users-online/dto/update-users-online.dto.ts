import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersOnlineDto } from './create-users-online.dto';

export class UpdateUsersOnlineDto extends PartialType(CreateUsersOnlineDto) {}
