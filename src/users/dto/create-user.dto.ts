import { IsNotEmpty, IsString, MaxLength, MinLength, minLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(12)
    @MinLength(9)
    phone: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(1)
    password: string
}
