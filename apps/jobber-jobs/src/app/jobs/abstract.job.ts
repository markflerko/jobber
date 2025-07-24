import { PulsarClient, serialize } from '@jobber/pulsar';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Producer } from 'pulsar-client';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, job: string) {
    await this.validateData(data);
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    if (Array.isArray(data)) {
      for (const message of data) {
        await this.send(message);
      }
      return;
    }
    await this.send(data);
  }

  private async send(data: T) {
    await this.producer.send({ data: serialize(data) });
  }

  private async validateData(data: T | T[]) {
    if (Array.isArray(data)) {
      const instances = plainToInstance(this.messageClass, data);
      for (const instance of instances) {
        const errors = await validate(instance);
        if (errors.length) {
          throw new BadRequestException(
            `Job data is invalid ${JSON.stringify(errors)}`
          );
        }
      }
    } else {
      const instance = plainToInstance(this.messageClass, data);
      const errors = await validate(instance);
      if (errors.length) {
        throw new BadRequestException(
          `Job data is invalid ${JSON.stringify(errors)}`
        );
      }
    }
  }
}
