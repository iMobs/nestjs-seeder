import type { Faker } from '@faker-js/faker';

import { FactoryMetadataStorage } from '../storages/factory.metadata.storage';

type BaseType =
  | string
  | number
  | Date
  | Buffer
  | boolean
  | Record<string, unknown>;
export type FactoryValue = BaseType | Array<BaseType>;
export type FactoryValueGenerator = (
  faker?: Faker,
  ctx?: Record<string, unknown>,
) => FactoryValue;

export function Factory(arg: FactoryValueGenerator | FactoryValue) {
  return (
    target: Record<string, unknown>,
    propertyKey: string | symbol,
  ): void => {
    FactoryMetadataStorage.addPropertyMetadata({
      target: target.constructor,
      propertyKey: propertyKey as string,
      arg,
    });
  };
}
