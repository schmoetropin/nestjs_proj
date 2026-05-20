import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto, TaskStatusEnum } from './task.dto';
import type { FindAllTasksParameters } from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ){}

    async create(task: TaskDto): Promise<void> {
        const date = new Date().toISOString();
        const data = {
            title: task.title,
            description: task.description,
            expiration_date: task.expiration_date,
            created_at: date,
            updated_at: date,
        }

        await this.taskRepository.save(data);
    }

    async getMany(params: FindAllTasksParameters): Promise<TaskDto[]> {
        return await this.taskRepository.find();
    }

    async findById(id: number): Promise<TaskDto> {
        const checkTask = await this.taskRepository.findOne({
            where: { id }
        });

        if (!checkTask) {
            throw new HttpException(`Id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return checkTask;
    }

    async update(task: TaskDto, id: number): Promise<void> {
        const checkTask = await this.taskRepository.findOne({
            where: { id }
        });

        if (!checkTask) {
            throw new HttpException(`Id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const date = new Date().toISOString();
        const data = {
            updated_at: date,
            title: task.title,
            description: task.description,
            status: task.status,
        };

        await this.taskRepository.update(id, data);
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
