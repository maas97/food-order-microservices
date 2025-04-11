import { GqlAuthGuard } from '@food-order/graphql';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Job } from './models/job.model';
import { JobService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job.input';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return this.jobService.executeJob(
      executeJobInput.name,
      executeJobInput.data
    );
  }
}
