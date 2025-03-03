import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Seeder } from './seeder.interface';
import { SeederModule, SeederModuleOptions } from './seeder.module';
import { SeederService } from './seeder.service';

export interface SeederOptions {
  imports?: Array<
    Type<unknown> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  providers?: Provider[];
}

export interface SeederRunner {
  run(seeders: Provider<Seeder>[]): Promise<void>;
}

async function bootstrap(options: SeederModuleOptions) {
  const app = await NestFactory.createApplicationContext(
    SeederModule.register(options),
  );
  const seedersService = app.get(SeederService);
  await seedersService.run();

  await app.close();
}

export const seeder = (options: SeederOptions): SeederRunner => {
  return {
    async run(seeders: Provider<Seeder>[]): Promise<void> {
      await bootstrap({
        ...options,
        seeders,
      });
    },
  };
};
