// Clever Fibonacci sequence generator in JavaScript

/**
 * Generates the Fibonacci sequence lazily.
 * Usage:
 *   const fib = fibonacci();
 *   fib.next().value // 0
 *   fib.next().value // 1
 *   fib.next().value // 1
 *   fib.next().value // 2
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
    Array.from({length: 10}, () => fib.next().value)
      .join(', ')
  );
}

module.exports = fibonacci;