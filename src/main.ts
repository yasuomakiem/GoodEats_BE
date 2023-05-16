/* eslint-disable prettier/prettier */
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, { cors: true });


  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const docs = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, docs);

  app.useStaticAssets(resolve('./src/public'));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();
