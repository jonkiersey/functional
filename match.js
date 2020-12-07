const Default = true;

const match = (value, array) => {
  if (!(array instanceof Array)) { throw Error('match expects an array as the second argument') }
  return array.reduce((acc, [test, expression]) => {
    if (acc) { return acc; }
    if (test === Default) {
      return expression;
    }
    if (typeof test === 'function') {
      if (test(value)) {
        return expression;
      }
    } else {
      if (value === test) {
        return expression;
      }
    }
    return undefined;
  }, undefined);
};

module.exports = { match, Default };

// const fruitArray = [
//   ['banana', () => console.log('The fruit was a banana')],
//   [(fruit) => fruit.length < 6, () => console.log('I think the fruit might be an apple')],
//   [Default, () => console.log('I give up... Is it a tangerine?')]
// ];

// match('banana', fruitArray)();
// match('apple', fruitArray)();
// match('pineapple', fruitArray)();
