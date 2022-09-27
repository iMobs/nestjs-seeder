import { Type } from '@nestjs/common';

import { PropertyMetadata } from '../interfaces';

export class FactoryMetadataStorageHost {
  private properties = new Array<PropertyMetadata>();

  addPropertyMetadata(metadata: PropertyMetadata): void {
    this.properties.push(metadata);
  }

  getPropertyMetadatasByTarget(target: Type<unknown>): PropertyMetadata[] {
    return this.properties.filter((property) => property.target === target);
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      FactoryMetadataStorage: FactoryMetadataStorageHost;
    }
  }
}

export const FactoryMetadataStorage: FactoryMetadataStorageHost =
  global.FactoryMetadataStorage ??
  (global.FactoryMetadataStorage = new FactoryMetadataStorageHost());
