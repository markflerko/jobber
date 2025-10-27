import { Jobs } from '@jobber/nestjs';
import { FibonacciMessage, PulsarClient } from '@jobber/pulsar';
import { Job } from '../../decorators/job.decorator';
import { PrismaService } from '../../prisma/prisma.service';
import { AbstractJob } from '../abstract.job';

@Job({
  name: Jobs.FIBONACCI,
  description: 'Generate a Fibonacci sequence and store it in the DB',
})
export class FibonacciJob extends AbstractJob<FibonacciMessage> {
  protected messageClass = FibonacciMessage;

  constructor(pulsarClient: PulsarClient, prismaService: PrismaService) {
    super(pulsarClient, prismaService);
  }
}
