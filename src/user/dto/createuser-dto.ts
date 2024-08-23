import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNumber()
    age: number

    @IsEnum(["Moderator", "Admin", "User"], { message: "user role is not exist" })
    role: "Moderator" | "Admin" | "User"
}