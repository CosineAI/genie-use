/**
 * Fibonacci generator function.
 * Usage:
 *   const gen = fibonacci();
 *   gen.next().value; // 0
 *   gen.next().value; // 1
 *   gen.next().value; // 1
 *   ...
 */
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Example usage if run directly
if (require.main === module) {
  const gen = fibonacci();
  for (let i = 0; i < 10; i++) {
    console.log(gen.next().value);
  }
}

module.exports = fibonacci;