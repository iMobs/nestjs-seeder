import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from './seeder.interface';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly seeders: Seeder[]) {}

  async run(): Promise<void> {
    const promises = this.shouldRefresh()
      ? [this.drop(), this.seed()]
      : [this.seed()];

    await Promise.all(promises);
  }

  async seed(): Promise<void> {
    // Don't use `Promise.all` during insertion.
    // `Promise.all` will run all promises in parallel which is not what we want.
    for (const seeder of this.seeders) {
      await seeder.seed();
      this.logger.log(`${seeder.constructor.name} completed`);
    }
  }

  async drop(): Promise<void> {
    await Promise.all(this.seeders.map(s => s.drop()));
  }

  shouldRefresh(): boolean {
    const argv = process.argv;
    return argv.includes('-r') || argv.includes('--refresh');
  }
}
