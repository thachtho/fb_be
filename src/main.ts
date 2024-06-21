import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:5000',
      'http://159.65.131.243',
      'http://localhost:5173',
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
