import {
  Injectable, Logger,
  BadRequestException, NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'
import { RequestCreateDto } from './dto/request-create.dto';
import { RequestQueryDto } from './dto/request-query.dto';
import { RequestUpdateDto } from './dto/request-update.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) { }

  getRequest(requestId: number) {
    Logger.log('Получаем заявку по id: '
      + requestId, RequestService.name);

    const response = this.prisma.request.findFirstOrThrow({
      where: { id: requestId },
    }).then((request) => {
      Logger.log('Получена заявка с id: '
        + request.id, RequestService.name);

      return request
    }).catch((e) => {
      if (e.code == 'P2025') {
        throw new NotFoundException('Не найдена заявка с id: ' + requestId)
      } else if (e.name = 'PrismaClientValidationError') {
        throw new BadRequestException('Вы ввели недопустимый параметр id')
      } else {
        throw e
      }
    })

    return response
  }

  postRequest(requestCreateDto: RequestCreateDto) {
    Logger.log('Создаем новую заявку: \n'
      + JSON.stringify(requestCreateDto), RequestService.name);

    const response = this.prisma.request.create({ data: requestCreateDto })
      .then((request) => {
        Logger.log('Создана новая заявка с id: ' + request.id, RequestService.name);

        return request
      }).catch((e) => {
        if (e.name == 'PrismaClientKnownRequestError') {
          throw new BadRequestException('Не прошла валидация в базе данных. Измените тело запроса.')
        } else {
          throw e
        }
      })

    return response
  }

  updateRequestById(requestId: number, requestUpdateDto: RequestUpdateDto) {
    Logger.log('Обновляем заявку с id: '
      + requestId
      + '\n Данные: \n'
      + JSON.stringify(requestUpdateDto), RequestService.name);

    const response = this.prisma.request.update(
      {
        where: { id: requestId },
        data: requestUpdateDto
      }).then((request) => {
        Logger.log('Обновлена заявка с id: ' + requestId)

        return request
      }).catch((e) => {
        if (e.code == 'P2025') {
          throw new NotFoundException('Не найдена заявка с id: ' + requestId)
        } else {
          throw e
        }
      })

    return response
  }

  deleteRequestById(requestId: number) {
    Logger.log('Удаляем заявку по id: '
      + requestId, RequestService.name);

    const response = this.prisma.request.delete({ where: { id: requestId } })
      .then((request) => {
        Logger.log('Удалена заявка с id: '
          + requestId, RequestService.name);

        return request
      }).catch((e) => {
        if (e.code == 'P2025') {
          throw new NotFoundException('Не найдена заявка с id: ' + requestId)
        } else {
          throw e
        }
      })

    return response
  }

  getRequestsByQuery(requestQueryDto: RequestQueryDto) {
    Logger.log('Получаем список заявок по параметрам: \n'
      + JSON.stringify(requestQueryDto), RequestService.name);

    const response = this.prisma.request.findMany({ where: requestQueryDto })
      .then((requestArr) => {
        let idArr = [];
        if (requestArr[0]) {
          requestArr.map((request) => {
            idArr.push(request.id)
          })
          Logger.log('Получены заявки c id: ' + idArr)
        } else {
          return []
        }

        return requestArr
      }).catch((e) => {
        throw e
      })

    return response
  }

}
