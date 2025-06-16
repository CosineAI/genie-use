/**
 * algo.ts
 * 
 * TypeScript module for generating Fibonacci sequences and writing them to a file.
 * 
 * USAGE (as CLI with ts-node):
 *   $ ts-node algo.ts 20 ./myFib.txt
 *     - Generates the first 20 Fibonacci numbers and writes them to ./myFib.txt (one per line).
 *   $ ts-node algo.ts
 *     - Defaults to 10 numbers, writes to fibonacci.txt in CWD.
 * 
 * USAGE (as import):
 *   import { generateFibonacci, writeFibonacciToFile } from './algo';
 *   const fib = generateFibonacci(15);
 *   writeFibonacciToFile(15, './fib15.txt');
 * 
 * NOTES:
 * - Requires Node.js environment (uses 'fs' and 'path' modules).
 * - No recursion: uses an iterative algorithm for efficiency.
 * - Input validation: n must be a positive integer > 0.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Generates the first `n` Fibonacci numbers using an iterative approach.
 * @param n Number of Fibonacci numbers to generate (must be integer > 0)
 * @returns Array of the first `n` Fibonacci numbers (starting with 0, 1)
 * @throws {Error} If n is not a positive integer greater than 0
 */
export function generateFibonacci(n: number): number[] {
    // Validate input
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error(`Invalid argument: n must be a positive integer greater than 0 (received ${n})`);
    }

    // Handle the special case where n = 1
    if (n === 1) {
        return [0];
    }

    // Initialize the sequence with the first two Fibonacci numbers
    const fib: number[] = [0, 1];

    // Compute the remaining numbers iteratively
    for (let i = 2; i < n; i++) {
        // Next number is the sum of the two previous
        fib.push(fib[i - 1] + fib[i - 2]);
    }

    return fib;
}

/**
 * Generates the first `n` Fibonacci numbers and writes them to a file, one per line.
 * Uses a write stream for efficient output.
 * @param n Number of Fibonacci numbers to generate (must be integer > 0)
 * @param filePath Path to the output file (absolute or relative, default: 'fibonacci.txt')
 * @returns void
 * @throws {Error} If n is not a positive integer greater than 0
 */
export function writeFibonacciToFile(n: number, filePath: string = 'fibonacci.txt'): void {
    // Validate input
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error(`Invalid argument: n must be a positive integer greater than 0 (received ${n})`);
    }

    // Resolve output path to an absolute path
    const outPath = path.resolve(filePath);

    // Generate Fibonacci sequence
    const sequence = generateFibonacci(n);

    // Create a write stream (overwrites if file exists)
    const stream = fs.createWriteStream(outPath, { flags: 'w' });

    stream.on('error', (err) => {
        // Log any I/O errors to the console
        console.error(`[ERROR] Failed to write to file: ${outPath}`);
        console.error(err);
    });

    // Write each number to the file on its own line
    for (let i = 0; i < sequence.length; i++) {
        // If last line, avoid extra newline at EOF (optional)
        if (i === sequence.length - 1) {
            stream.write(sequence[i].toString());
        } else {
            stream.write(sequence[i].toString() + '\n');
        }
    }

    // Close the stream after writing all numbers
    stream.end();
}

/**
 * If the script is run directly, parse CLI arguments and invoke writeFibonacciToFile.
 */
if (require.main === module) {
    // Get arguments: [node, algo.ts, n?, filePath?]
    const argv = process.argv;

    // Parse n (desired number of Fibonacci numbers), default to 10
    const nRaw = argv[2];
    const n: number = nRaw !== undefined ? Number(nRaw) : 10;

    // Parse file path, default to 'fibonacci.txt'
    const filePath: string = argv[3] !== undefined ? argv[3] : 'fibonacci.txt';

    try {
        writeFibonacciToFile(n, filePath);
        // Print confirmation message when finished
        console.log(`Successfully wrote the first ${n} Fibonacci numbers to "${path.resolve(filePath)}".`);
    } catch (err) {
        // Catch and display any errors (validation, I/O, etc.)
        console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
        process.exit(1);
    }
}