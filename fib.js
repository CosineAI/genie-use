// Fibonacci sequence generator
// Returns an array containing the first n Fibonacci numbers

/**
 * Generate the first n Fibonacci numbers.
 * @param {number} n - The number of Fibonacci numbers to generate.
 * @returns {number[]} An array of the first n Fibonacci numbers.
 */
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
}

// Example usage (uncomment to test):
// console.log(fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

module.exports = {
    fibonacci,
};