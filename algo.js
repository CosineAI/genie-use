// A complicated Fibonacci implementation in JavaScript

/**
 * Returns the nth Fibonacci number using a combination of recursion,
 * memoization, generator functions, and closures.
 * This is intentionally convoluted for demonstration purposes.
 */

// Generator to lazily produce Fibonacci numbers up to n
function* fibGenerator(n) {
    let memo = { 0: 0, 1: 1 };
    function fibMemo(k) {
        if (memo[k] !== undefined) return memo[k];
        memo[k] = fibMemo(k - 1) + fibMemo(k - 2);
        return memo[k];
    }
    for (let i = 0; i <= n; i++) {
        yield fibMemo(i);
    }
}

// Closure-based memoization wrapper with logging
function complicatedFibonacci() {
    const memo = {};
    let callCount = 0;

    function fib(n) {
        callCount++;
        if (n in memo) return memo[n];
        if (n <= 1) {
            memo[n] = n;
        } else {
            // Use a generator to compute intermediate values just to be fancy
            let gen = fibGenerator(n - 1);
            let prev = 0, last = 0;
            for (let i = 0; i < n - 1; i++) {
                prev = last;
                last = gen.next().value;
            }
            memo[n] = prev + last;
        }
        return memo[n];
    }

    fib.getCallCount = () => callCount;
    fib.clearMemo = () => { for (let k in memo) delete memo[k]; };
    return fib;
}

// Export an instance of the complicated Fibonacci
const fib = complicatedFibonacci();

module.exports = {
    fib,
    // Also exporting a function to display the full sequence for extra complexity
    printFibonacciSequence: function(n) {
        const sequence = [];
        for (let i = 0; i <= n; i++) {
            sequence.push(fib(i));
        }
        console.log(`Fibonacci sequence up to ${n}:`, sequence.join(', '));
        console.log(`Function was called ${fib.getCallCount()} times.`);
    }
};

// Example usage (uncomment to run directly):
// module.exports.printFibonacciSequence(10);
// console.log('fib(20) =', module.exports.fib(20));