export class TaskDto {
    id?: number;
    title!: string;
    description!: string;
    status!: string;
    expiration_date!: Date;
}

export interface FindAllTasksParameters {
    title: string;
    status: string;
};