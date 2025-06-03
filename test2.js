/**
 * Prints the Fibonacci sequence up to a specified number of terms.
 */
function printFibonacci(n) {
    let a = 0, b = 1;
    let result = [];
    for (let i = 0; i < n; i++) {
        result.push(a);
        let next = a + b;
        a = b;
        b = next;
    }
    console.log(result.join(', '));
}

// Example: Print first 10 Fibonacci numbers
printFibonacci(10);