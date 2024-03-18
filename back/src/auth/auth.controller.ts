import {
    Controller, Body, Post,
    HttpCode, HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthSignInDto } from './dto/auth-sign-in.dto'
import { Config } from 'config/main.config'

const apiPath: string = Config['apiPath'];
const authServicePath = Config.servicePath['auth'];


@Controller(apiPath + '/auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @HttpCode(HttpStatus.OK)
    @Post('/login')
    @ApiOperation({ summary: 'Аутентификация по логину и паролю' })
    signIn(@Body() authSignInDto: AuthSignInDto) {
        return this.authService.signIn(
            authSignInDto.username,
            authSignInDto.password
        )
    }
}
