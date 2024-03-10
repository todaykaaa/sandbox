import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        const hash = await bcrypt.hash(pass, user.salt);
        if (user?.password !== hash) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.login }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
