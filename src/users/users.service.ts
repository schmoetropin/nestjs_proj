import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ){}

    async create (newUser: UserDto): Promise<void> {
        const regUser = await this.findByEmail(newUser.email, false);

        if (regUser) {
            throw new ConflictException(`User ${regUser.email} already registered`);
        }

        const date = new Date().toISOString();
        const data = {
            name: newUser.name,
            email: newUser.email,
            password: hashSync(newUser.password, 10),
            createdAt: date,
            updatedAt: date,
        };

        const {id, email} = await this.usersRepository.save(data);
    }

    async findByEmail(email: string, throwResp: boolean = true): Promise<UserDto|null> {
        const user: any = await this.usersRepository.findOne({
            where: { email }
        });

        if (!user) {
            if (throwResp) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            } else {
                return null;
            }
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
}
