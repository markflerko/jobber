import { PulsarModule } from '@jobber/pulsar';
import { Module } from '@nestjs/common';
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';
import { JobClientsModule } from './job-clients.module';
import { LoadProductsModule } from './products/load-products.module';

@Module({
  imports: [PulsarModule, LoadProductsModule, JobClientsModule],
  providers: [FibonacciConsumer],
})
export class JobsModule {}
