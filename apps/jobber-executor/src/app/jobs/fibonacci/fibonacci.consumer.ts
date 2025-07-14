import { PulsarClient, PulsarConsumer } from '@jobber/pulsar';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer implements OnModuleInit {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }
}
