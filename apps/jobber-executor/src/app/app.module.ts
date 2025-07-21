import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [JobsModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
