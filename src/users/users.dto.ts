import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto{
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsString()
    name!: string;

    @IsString()
    email!: string;

    @IsString()
    password!: string;

    @IsOptional()
    @IsDateString()
    created_at?: Date;

    @IsOptional()
    @IsDateString()
    updated_at?: Date;
}