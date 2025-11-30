import { GqlAuthGuard } from '@jobber/graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExecuteJobInput } from './dto/execute-job.input';
import { JobsService } from './jobs.service';
import { JobMetadata } from './models/job-metadata.model';
import { Job } from './models/job.model';

@Resolver()
@UseGuards(GqlAuthGuard)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobMetadata], { name: 'jobsMetadata' })
  async getJobMetadata() {
    return this.jobsService.getJobMetadata();
  }

  @Query(() => Job, { name: 'job' })
  async getJob(@Args('id') id: number) {
    return this.jobsService.getJob(id);
  }

  @Query(() => [Job], { name: 'jobs' })
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  async executeJob(@Args('executeJobInput') { name, data }: ExecuteJobInput) {
    return this.jobsService.executeJob(name, data);
  }
}
