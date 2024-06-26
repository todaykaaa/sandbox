import {
  Controller, Get, Post,
  Patch, Delete, Param,
  Query, Body, Header, UseGuards
} from '@nestjs/common';
import { RequestService } from './request.service';
import { request } from '@prisma/client';
import { RequestCreateDto } from './dto/request-create.dto';
import { RequestQueryDto } from './dto/request-query.dto';
import { RequestUpdateDto } from './dto/request-update.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Config } from 'config/main.config'

const apiPath = Config['apiPath'];
const requestServicePath = Config.servicePath['request'];


@ApiBearerAuth()
@Controller(apiPath + requestServicePath)
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Get('/get/:requestId')
  @ApiOperation({ summary: 'Получить заявку по ее id' })
  getRequestById(@Param('requestId') requestId: string): Promise<request> {
    return this.requestService.getRequest(+requestId)
  }

  @UseGuards(AuthGuard)
  @Patch('/update/:requestId')
  @ApiOperation({ summary: 'Обновить заявку по ее id' })
  updateRequestById(@Param('requestId') requestId: string, @Body() requestUpdateDto: RequestUpdateDto): Promise<request> {
    return this.requestService.updateRequestById(+requestId, requestUpdateDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:requestId')
  @ApiOperation({ summary: 'Удалить заявку по ее id' })
  deleteRequestById(@Param('requestId') requestId: string): Promise<request> {
    return this.requestService.deleteRequestById(+requestId);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Добавить новую заявку' })
  postRequest(@Body() requestCreateDto: RequestCreateDto): Promise<request> {
    return this.requestService.postRequest(requestCreateDto);
  }


  @Get('get')
  @Header('Content-Type', 'application/json; charset=utf-8')
  @ApiOperation({ summary: 'Получить заявки в зависимости от параметров' })
  @ApiQuery({ name: 'recalled', required: false, type: 'boolean' })
  @ApiQuery({ name: 'answered', required: false, type: 'boolean' })
  @ApiQuery({ name: 'appointment', required: false, type: 'boolean' })
  getRequestsByQuery(@Query() requestQueryDto: RequestQueryDto): Promise<Array<Object>> {
    return this.requestService.getRequestsByQuery(requestQueryDto);
  }

}
