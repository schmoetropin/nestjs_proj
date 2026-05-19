import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';
import type { FindAllTasksParameters } from './task.dto';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: TaskDto): void {
        this.tasks.push(task);
    }

    getMany(params: FindAllTasksParameters): TaskDto[] {
        return this.tasks.filter(t => {
            let match = true;

            if (params.title != undefined && t.title != params.title) {
                match = false;
            }

            if (params.status != undefined && t.status != params.status) {
                match = false;
            }

            return match;
        });
    }

    findById(id: number): TaskDto {
        const checkTask = this.tasks.filter(t => t.id == id);

        if (!checkTask.length) {
            throw new HttpException(`Id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return this.tasks.filter((t: TaskDto) =>{
            if (id != t.id)
                return false;
            return t;
        })[0];
    }

    populate(): void {
        const date = new Date('2026-05-19');

        const data: TaskDto[] = [
            {"id": 1, "title": "tit test", "description": "desc test", "status": "on", "expiration_date": date},
            {"id": 2, "title": "tit test2", "description": "desc test", "status": "on", "expiration_date": date},
        ];

        this.tasks = data;
    }

    update(task: TaskDto, id: number): void {
        const checkTask = this.tasks.filter(t => t.id == id);

        if (!checkTask.length) {
            throw new HttpException(`Id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const date = new Date(task.expiration_date);
        const taskIndex = this.tasks.findIndex(t => t.id == id);
        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...task,
            expiration_date: date,
        };
    }

    delete(id: number): void {
        const checkTask = this.tasks.filter(t => t.id == id);

        if (!checkTask.length) {
            throw new HttpException(`Id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const taskIndex = this.tasks.findIndex(t => t.id == id);
        this.tasks.splice(taskIndex, 1);
    }
}
