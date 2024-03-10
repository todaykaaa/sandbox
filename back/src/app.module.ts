import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RequestModule } from 'src/requests/request.module';
import { PostModule } from 'src/posts/post.module'

@Module({
  imports: [
    PrismaModule, AuthModule,
    UsersModule, RequestModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
