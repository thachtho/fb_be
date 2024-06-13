import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
