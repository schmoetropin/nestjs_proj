import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'varchar' })
    email!: string;

    @Column({ type: 'varchar' })
    password?: string;

    @Column({ type: 'timestamptz', name: 'created_at' })
    createdAt!: Date;

    @Column({ type: 'timestamptz', name: 'updated_at' })
    updatedAt!: Date;
}