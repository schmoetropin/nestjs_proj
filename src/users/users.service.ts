import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
    private users: UserDto[] = [
        {
            id: 1,
            name: "name1",
            email: "g@g.c",
            password: "123456",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 2,
            name: "name2",
            email: "w@w.c",
            password: "123456",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ];

    findByEmail(email: string, throwResp: boolean = true): UserDto|null {
        const checkEmail = this.users.filter(u => u.email == email);

        if (!checkEmail.length) {
            if (throwResp) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            } else {
                return null;
            }
        }

        const userIndex = this.users.findIndex(u => u.email == email);

        return this.users[userIndex];
    }
}
