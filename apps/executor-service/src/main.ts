require('module-alias/register');
import { init } from '@food-order/nestjs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await init(app);
}

bootstrap();
