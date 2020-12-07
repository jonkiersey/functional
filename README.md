Building this to standardize common coding ideas that I like to use, with a special focus on creating tools that enable
a functional style of programming.

---

## match
A pattern matching function that can help us reduce cyclomatic complexity. It takes in a value to test against along with an
array of test/expression pairs. It will return the expression that has the first matching test. Tests can be functions or
primitives. If the test is a function, the test will be called with the value to test and the truthiness of its return value
will determine if we use its expression. If the test is a primitive, we will compare the test to the value to test with strict
equality.

Usage:
    const { match, Default: _ } = require('./match');

    const fruitArray = [
      ['banana', () => console.log('The fruit was a banana')],
      [(fruit) => fruit.length < 6, () => console.log('I think the fruit might be an apple')],
      [_, () => console.log('I give up... Is it a tangerine?')]
    ];

    // Note that the returned value of match() is being called here, which calls the function returned from match

    match('banana', fruitArray)();
    // 'The fruit was a banana'
    match('apple', fruitArray)();
    // 'I think the fruit might be an apple'
    match('pineapple', fruitArray)();
    // 'I give up... Is it a tangerine?