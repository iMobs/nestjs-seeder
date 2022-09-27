import { faker } from '@faker-js/faker';
import { Type } from '@nestjs/common';

import { FactoryValue } from '../decorators/factory.decorator';
import { Factory, PropertyMetadata } from '../interfaces';
import { FactoryMetadataStorage } from '../storages/factory.metadata.storage';

export class DataFactory {
  static createForClass(target: Type<unknown>): Factory {
    if (!target) {
      throw new Error(
        `Target class "${target}" passed in to the "TemplateFactory#createForClass()" method is "undefined".`,
      );
    }

    const properties =
      FactoryMetadataStorage.getPropertyMetadatasByTarget(target);

    return {
      generate: (
        count: number,
        values: Record<string, unknown> = {},
      ): Record<string, FactoryValue>[] => {
        const result = [];
        for (let i = 0; i < count; i++) {
          result.push(this.generate(properties, values));
        }
        return result;
      },
    };
  }

  private static generate(
    properties: PropertyMetadata[],
    values: Record<string, unknown>,
  ): Record<string, FactoryValue> {
    const ctx = { ...values };
    return properties.reduce((acc, property) => {
      let value: FactoryValue;

      if (typeof property.arg === 'function') {
        value = property.arg(faker, ctx);
      } else {
        value = property.arg;
      }

      acc[property.propertyKey] = value;

      return acc;
    }, {});
  }
}
