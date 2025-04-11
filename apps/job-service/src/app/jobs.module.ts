import { PulsarModule } from '@food-order/pulsar';
import { AUTH_PACKAGE_NAME } from '@food-order/grpc';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';
import { JobService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
        },
      },
    ]),
  ],
  providers: [FibonacciJob, JobService, JobsResolver],
})
export class JobsModule {}
