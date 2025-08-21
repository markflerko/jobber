import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { LoggerModule } from '@jobber/nestjs';

@Module({
  imports: [JobsModule, LoggerModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
