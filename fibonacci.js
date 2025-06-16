// fibonacci.js

/**
 * Clever Fibonacci sequence generator using ES6 generator functions.
 * Usage:
 *   const fib = fibonacci();
 *   fib.next().value; // 0
 *   fib.next().value; // 1
 *   fib.next().value; // 1
 *   fib.next().value; // 2
 *   fib.next().value; // 3
 *   ...
 */

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Example: Print the first 10 Fibonacci numbers
if (require.main === module) {
  const fib = fibonacci();
  console.log(
    Array.from({ length: 10 }, () => fib.next().value).join(", ")
  );
}

module.exports = fibonacci;