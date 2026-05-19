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
    create(@Body() task: TaskDto): void {
        this.taskService.create(task);
    }

    @Get('/list')
    getMany(@Query() params: FindAllTasksParameters): TaskDto[] {
        return this.taskService.getMany(params);
    }

    @Get('/find/:id')
    findById(@Param('id') id: number): TaskDto{
        return this.taskService.findById(id);
    }

    @Post('/populate')
    populate(): void {
        this.taskService.populate();
    }

    @Put('/update/:id')
    update(@Body() task: TaskDto, @Param('id') id: number): void {
        this.taskService.update(task, id);
    }

    @Delete('/delete/:id')
    delete(@Param('id') id: number): void {
        this.taskService.delete(id);
    }
}
