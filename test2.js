function printFibonacci(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        console.log(a);
        [a, b] = [b, a + b];
    }
}

// Print the first 10 Fibonacci numbers
printFibonacci(10);

// Export for testability if needed
module.exports = { printFibonacci };