import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export enum TaskStatusEnum {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class TaskDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title!: string;

    @IsString()
    @MinLength(5)
    @MaxLength(512)
    @IsOptional()
    description!: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status?: string;

    @IsDateString()
    expiration_date!: Date;

    @IsOptional()
    @IsDateString()
    created_at?: Date;

    @IsOptional()
    @IsDateString()
    updated_at?: Date;
}

export interface FindAllTasksParameters {
    title: string;
    status: string;
};