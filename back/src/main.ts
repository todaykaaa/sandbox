import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationTypes } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error',
      'warn', 'debug', 'verbose']
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Request Api')
    .setDescription('Api for Public requests')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http', scheme: 'bearer',
        bearerFormat: 'JWT', in: 'header'
      },
    )
    .addTag('Заявки')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
