import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';
import type { FindAllTasksParameters } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post()
    async create(@Body() task: TaskDto): Promise<void> {
        await this.taskService.create(task);
    }

    @Get('/list')
    async getMany(@Query() params: FindAllTasksParameters): Promise<TaskDto[]> {
        return await this.taskService.getMany(params);
    }

    @Get('/find/:id')
    async findById(@Param('id') id: number): Promise<TaskDto> {
        return await this.taskService.findById(id);
    }

    @Put('/update/:id')
    async update(@Body() task: TaskDto, @Param('id') id: number): Promise<void> {
        await this.taskService.update(task, id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.taskService.delete(id);
    }
}
