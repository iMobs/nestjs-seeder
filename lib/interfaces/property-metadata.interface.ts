import {
  FactoryValue,
  FactoryValueGenerator,
} from '../decorators/factory.decorator';

export interface PropertyMetadata {
  target: unknown;
  propertyKey: string;
  arg: FactoryValue | FactoryValueGenerator;
}
