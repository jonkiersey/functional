const { match, Default: _ } = require('./match');

const fruitArray = [
  ['banana', () => console.log('The fruit was a banana')],
  [(fruit) => fruit.length < 6, () => console.log('I think the fruit might be an apple')],
  [_, () => console.log('I give up... Is it a tangerine?')]
];

match('banana', fruitArray)();
match('apple', fruitArray)();
match('pineapple', fruitArray)();

describe('match', () => {

  test('throws an error if no array', () => {
    expect(() => match()).toThrow();
  });

  test('returns undefined if array is empty', () => {
    expect(match('test', [])).toBeUndefined();
  });

  test('returns the expression paired with a matching primitive', () => {
    const array = [
      ['testValue', 'test expression']
    ]
    expect(match('testValue', array)).toEqual('test expression');
  });

  test('returns the expression paired with a passing test function', () => {
    const array = [
      [(v) => v.length > 5, 'test expression']
    ]
    expect(match('testValue', array)).toEqual('test expression');
  });

  test('returns the first expression with a matching primitive', () => {
    const array = [
      ['testValue', 'first'],
      ['testValue', 'second']
    ];
    expect(match('testValue', array)).toEqual('first');
  });

  test('returns the first expression with a passing test function', () => {
    const array = [
      [(v) => v.length > 5, 'first'],
      [(v) => v.length > 5, 'second']
    ];
    expect(match('testValue', array)).toEqual('first');
  });

  test('returns the default expression if no other tests match', () => {
    const array = [
      ['testValue', 'first'],
      [(v) => v.length < 5, 'second'],
      [_, 'default expression']
    ];
    expect(match('non matching value', array)).toEqual('default expression');
  });

  test('returns the default expression if default is the only test', () => {
    const array = [
      [_, 'default expression']
    ];
    expect(match('anything', array)).toEqual('default expression');
  });

  test('returns the expression paired with the first matching primitive when function tests are also present', () => {
    const array = [
      ['first', 'first'],
      [(v) => !v, 'second'],
      ['third', 3]
    ];
    expect(match('third', array)).toEqual(3);
  });

  test('returns the expression paired with the first passing test when primitive tests are also present', () => {
    const array = [
      ['first', 'first'],
      [(v) => !v, 'second'],
      [(v) => v, 3]
    ];
    expect(match('third', array)).toEqual(3);
  });

  test('can return a function', () => {
    const array = [
      [_, () => true]
    ];
    const returnedFunction = match('anything', array);
    expect(returnedFunction()).toEqual(true);
  });
});
