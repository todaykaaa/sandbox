import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(username: string) {
        return this.prisma.user.findFirstOrThrow({
            where: { login: username },
        });
    }
}
