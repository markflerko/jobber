import { GqlAuthGuard } from 'libs/graphql/src';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExecuteJobInput } from './dto/execute-job.input';
import { JobsService } from './jobs.service';
import { Job } from './models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') { name, data }: ExecuteJobInput) {
    return this.jobsService.executeJob(name, data);
  }
}
