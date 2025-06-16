import * as fs from 'fs';
import * as path from 'path';

/**
 * Generates Fibonacci sequence up to n terms and writes each number to a text file line by line.
 * @param n Number of Fibonacci numbers to generate.
 * @param outputFile Output file path.
 */
function writeFibonacciToFile(n: number, outputFile: string) {
    if (n <= 0) {
        throw new Error('n must be a positive integer');
    }
    const fibs: number[] = [];
    for (let i = 0; i < n; i++) {
        if (i === 0) fibs.push(0);
        else if (i === 1) fibs.push(1);
        else fibs.push(fibs[i - 1] + fibs[i - 2]);
    }
    // Prepare file content: one number per line
    const content = fibs.join('\n');
    fs.writeFileSync(outputFile, content, 'utf-8');
    console.log(`Wrote ${n} Fibonacci numbers to ${outputFile}`);
}

// Example usage: write first 20 Fibonacci numbers to 'fibonacci.txt' in current directory
if (require.main === module) {
    const n = 20;
    const outputPath = path.join(__dirname, 'fibonacci.txt');
    writeFibonacciToFile(n, outputPath);
}