import { Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';
import { deserialize } from './serialize';

export abstract class PulsarConsumer<T> implements OnModuleInit {
  private consumer!: Consumer;
  protected readonly logger = new Logger(this.topic);

  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}

  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.listener.bind(this)
    );
  }

  private async listener(message: Message) {
    try {
      const data = deserialize<T>(message.getData());
      this.logger.debug(`Received message: ${JSON.stringify(data)}`);
      await this.onMessage(data);
    } catch (error) {
      this.logger.error(error);
    } finally {
      await this.consumer.acknowledge(message);
    }
  }

  protected abstract onMessage(message: T): Promise<void>;
}
