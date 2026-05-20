import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('/store')
    async saveUser(@Body() newUser: UserDto): Promise<number> {
        await this.usersService.create(newUser);

        return 1
    }
}
