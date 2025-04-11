require('module-alias/register');
import { AUTH_PACKAGE_NAME } from '@food-order/grpc';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { init } from '@food-order/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await init(app);
  await app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();
}

bootstrap();
