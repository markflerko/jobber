import { PulsarClient, serialize } from '@jobber/pulsar';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Producer } from 'pulsar-client';
import { JobStatus } from '../models/job-status.enum';
import { PrismaService } from '../prisma/prisma.service';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly prismaService: PrismaService
  ) {}

  async execute(data: T, name: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(name);
    }
    const job = await this.prismaService.job.create({
      data: {
        name,
        size: Array.isArray(data) ? data.length : 1,
        completed: 0,
        status: JobStatus.IN_PROGRESS,
      },
    });
    if (Array.isArray(data)) {
      for (const message of data) {
        this.send({ ...message, jobId: job.id });
      }
      return;
    }
    this.send({ ...data, jobId: job.id });
  }

  private send(data: T) {
    this.validateData(data).then(() => {
      this.producer.send({ data: serialize(data) });
    });
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
