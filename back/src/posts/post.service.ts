import {
  Injectable, Logger,
  BadRequestException, NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'
import { PostCreateDto } from './dto/post-create.dto'
import { PostUpdateDto } from './dto/post-update.dto'
import { PostQueryDto } from './dto/post-query.dto'
import { SortByEnum } from './enum/sort-by.enum';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  getPost(postId: number) {
    Logger.log('Получаем новостной пост по id: '
      + postId, PostService.name);

    const response = this.prisma.post.findFirstOrThrow({
      where: { id: postId },
    }).then((post) => {
      Logger.log('Получен новостной пост по id: '
        + post.id, PostService.name);

      return post
    }).catch((e) => {
      if (e.code == 'P2025') {
        throw new NotFoundException('Не найден новостной пост с id: ' + postId)
      } else if (e.name = 'PrismaClientValidationError') {
        throw new BadRequestException('Вы ввели недопустимый параметр id')
      } else {
        throw e
      }
    })

    return response
  }

  postPost(postCreateDto: PostCreateDto) {
    Logger.log('Создаем новый новостной пост: \n'
      + JSON.stringify(postCreateDto), PostService.name);

    const response = this.prisma.post.create({ data: postCreateDto })
      .then((post) => {
        Logger.log('Создан новый новостной пост с id: ' + post.id, PostService.name);

        return post
      }).catch((e) => {
        if (e.name == 'PrismaClientKnownRequestError') {
          throw new BadRequestException('Не прошла валидация в базе данных. Измените тело запроса.')
        } else {
          throw e
        }
      })

    return response
  }

  updatePostById(postId: number, postUpdateDto: PostUpdateDto) {
    Logger.log('Обновляем новостной пост с id: '
      + postId
      + '\n Данные: \n'
      + JSON.stringify(postUpdateDto), PostService.name);

    const response = this.prisma.post.update(
      {
        where: { id: postId },
        data: postUpdateDto
      }).then((post) => {
        Logger.log('Обновлен новостной пост с id: ' + postId)

        return post
      }).catch((e) => {
        if (e.code == 'P2025') {
          throw new NotFoundException('Не найден новостной пост с id: ' + postId)
        } else {
          throw e
        }
      })

    return response
  }

  deletePostById(postId: number) {
    Logger.log('Удаляем новостной пост по id: '
      + postId, PostService.name);

    const response = this.prisma.post.delete({ where: { id: postId } })
      .then((post) => {
        Logger.log('Удален новостной пост с id: '
          + postId, PostService.name);

        return post
      }).catch((e) => {
        if (e.code == 'P2025') {
          throw new NotFoundException('Не найден новостной пост с id: ' + postId)
        } else {
          throw e
        }
      })

    return response
  }

  async getPostsByQuery(postQueryDto: PostQueryDto) {
    Logger.log('Получаем новостные посты по параметрам: \n'
      + JSON.stringify(postQueryDto), PostService.name);

    const Filter = function (categoryId: number) {
      this.categoryId = categoryId
    }

    const OrderBy = function (sortType: string) {
      this.id = sortType
    }

    const pageSize: number = postQueryDto.pageSize ? postQueryDto.pageSize : 6;
    const pageNumber: number = postQueryDto.pageNumber ? postQueryDto.pageNumber : 1;
    const sortType: string = postQueryDto.sort ? postQueryDto.sort : SortByEnum.desc;
    const skip: number = postQueryDto.pageNumber > 1 ? ((pageSize * pageNumber) - pageSize) : 0;
    const sort = new OrderBy(sortType);
    var pageCount: number

    const SortedResponse = function (
      posts,
      pageSize: number,
      sortType: string,
      pageNumber: number,
      pageCount: number
    ) {
      this.posts = posts
      this.pageSize = pageSize
      this.sortType = sortType
      this.pageNumber = pageNumber
      this.pageCount = pageCount
    }

    const paginationQuery = function (
      pageSize: number,
      skip: number,
      sortType,
      filter?) {
      this.take = pageSize,
        this.skip = skip,
        this.where = filter,
        this.orderBy = sortType
    }

    if (postQueryDto.categoryUrl) {

      const categoryIdRes = await this.prisma.category.findFirstOrThrow({
        where: {
          categoryUrl: {
            contains: postQueryDto.categoryUrl
          }
        },
        select: {
          id: true
        }
      }).catch(e => {
        if (e.name == 'NotFoundError') {
          throw new NotFoundException('Не найдена категория: ' + postQueryDto.categoryUrl)
        } else {
          throw e
        }
      })

      const categoryId = categoryIdRes.id
      const filter = new Filter(categoryId);

      const filteredPostsCount = await this.prisma.post.count({
        where: {
          categoryId: categoryId
        }
      }).catch(e => { throw e })

      pageCount = filteredPostsCount > pageSize ? Math.ceil(filteredPostsCount / pageSize) : 1;

      const paginationFilteredPosts = await this.prisma.post.findMany(
        new paginationQuery(
          pageSize,
          skip,
          sort,
          filter
        )
      ).catch(e => { throw e });

      return new SortedResponse(paginationFilteredPosts, pageSize, sortType, pageNumber, pageCount)
    } else {

      const allPostsCount = await this.prisma.post.count().catch(e => { throw e })

      pageCount = allPostsCount > pageSize ? Math.ceil(allPostsCount / pageSize) : 1;

      const paginationFilteredPosts = await this.prisma.post.findMany(
        new paginationQuery(
          pageSize,
          skip,
          sort
        )
      ).catch(e => { throw e });

      return new SortedResponse(paginationFilteredPosts, pageSize, sortType, pageNumber, pageCount)
    }

  }
}
