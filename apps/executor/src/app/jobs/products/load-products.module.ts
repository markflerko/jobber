import { PulsarModule } from '@jobber/pulsar';
import { Module } from '@nestjs/common';
import { LoadProductsConsumer } from './load-products.consumer';

@Module({
  imports: [PulsarModule],
  providers: [LoadProductsConsumer],
})
export class LoadProductsModule {}
