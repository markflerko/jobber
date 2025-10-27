import { Jobs } from '@jobber/nestjs';
import { LoadProductsMessage, PulsarClient } from '@jobber/pulsar';
import { Job } from '../../decorators/job.decorator';
import { PrismaService } from '../../prisma/prisma.service';
import { AbstractJob } from '../abstract.job';

@Job({
  name: Jobs.LOAD_PRODUCTS,
  description: 'Loads uploaded product data into the DB after enrichment.',
})
export class LoadProductsJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;

  constructor(pulsarClient: PulsarClient, prismaService: PrismaService) {
    super(pulsarClient, prismaService);
  }
}
