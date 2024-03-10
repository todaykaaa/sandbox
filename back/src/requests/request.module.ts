import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { PrismaModule } from 'prisma/prisma.module'
import { RequestController } from './request.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService]
})
export class RequestModule { }
