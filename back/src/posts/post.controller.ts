import {
  Controller, Get, Post,
  Patch, Delete, Param,
  Query, Body, Header, UseGuards
} from '@nestjs/common';
import { PostService } from './post.service';
import { post } from '@prisma/client';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { PostQueryDto } from './dto/post-query.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Получить пост по его id' })
  getPostById(@Param('postId') postId: string): Promise<post> {
    return this.postService.getPost(+postId)
  }

  @UseGuards(AuthGuard)
  @Patch('post/:postId')
  @ApiOperation({ summary: 'Обновить новостной пост по его id' })
  updatePostById(@Param('postId') postId: string, @Body() postUpdateDto: PostUpdateDto): Promise<post> {
    return this.postService.updatePostById(+postId, postUpdateDto);
  }

  @UseGuards(AuthGuard)
  @Delete('post/:postId')
  @ApiOperation({ summary: 'Удалить новостной пост по его id' })
  deletePostById(@Param('postId') postId: string): Promise<post> {
    return this.postService.deletePostById(+postId);
  }

  @UseGuards(AuthGuard)
  @Post('post')
  @ApiOperation({ summary: 'Создать новый новостной пост' })
  postRequest(@Body() postCreateDto: PostCreateDto): Promise<post> {
    return this.postService.postPost(postCreateDto);
  }

  @Get('posts')
  @Header('Content-Type', 'application/json; charset=utf-8')
  @ApiOperation({ summary: 'Получить новости в зависимости от параметров' })
  @ApiQuery({ name: 'categoryUrl', required: false, type: 'string' })
  @ApiQuery({ name: 'sort', required: false, type: 'string' })
  @ApiQuery({ name: 'pageSize', required: false, type: 'string' })
  @ApiQuery({ name: 'pageNumber', required: true, type: 'string' })
  getRequestsByQuery(@Query() postQueryDto: PostQueryDto) {
    return this.postService.getPostsByQuery(postQueryDto);
  }

}
