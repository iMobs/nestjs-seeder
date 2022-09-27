import { FactoryValue } from '../decorators/factory.decorator';

export interface Factory {
  generate(
    count: number,
    values?: Record<string, unknown>,
  ): Record<string, FactoryValue>[];
}
