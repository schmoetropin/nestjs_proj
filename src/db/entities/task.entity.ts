import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'task' })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'varchar' })
    title!: string;

    @Column({ type: 'varchar' })
    description!: string;

    @Column({ type: 'varchar' })
    status?: string;

    @Column({ type: 'timestamptz', name: 'expiration_date' })
    expiration_date!: Date;

    @Column({ type: 'timestamptz' })
    created_at?: Date;

    @Column({ type: 'timestamptz' })
    updated_at?: Date;
}