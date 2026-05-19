import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    private tokenExpTime: number|undefined;

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.tokenExpTime = this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    signIn(email: string, password: string): AuthResponseDto {
        const checkUser = this.userService.findByEmail(email, false);

        if (!checkUser/* || !compareSync(password, checkUser.password)*/) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const payload = { sub: checkUser.id, username: checkUser.email };
        const expire = (this.tokenExpTime ? this.tokenExpTime : 10000) * 6;
        const token = this.jwtService.sign(payload, {expiresIn: `${expire}m`});

        return {
            token,
            expiresIn: expire,
        };
    }
}
