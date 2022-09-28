import { DataFactory, Factory } from '../lib';

describe('Factory', () => {
  it('creates a fixture with static data', () => {
    class Example {
      @Factory('test')
      name: string;
    }

    const [result] = DataFactory.createForClass(Example).generate(1);
    expect(result).toHaveProperty('name', 'test');
  });

  it('creates a fixture with faker data', () => {
    class Example {
      @Factory((faker) => faker.name.fullName())
      name: string;
    }

    const [result] = DataFactory.createForClass(Example).generate(1);
    expect(result).toHaveProperty('name');
  });
});
