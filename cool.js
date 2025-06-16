// cool.js

/**
 * Animated ASCII Fireworks in the Terminal!
 * Run with: node cool.js
 * 
 * This script will display an animated fireworks show in your terminal.
 * Enjoy the colors and the show!
 */

const readline = require('readline');

// Terminal color codes
const colors = [
    '\x1b[31m', // Red
    '\x1b[32m', // Green
    '\x1b[33m', // Yellow
    '\x1b[34m', // Blue
    '\x1b[35m', // Magenta
    '\x1b[36m', // Cyan
    '\x1b[91m', // Bright Red
    '\x1b[92m', // Bright Green
    '\x1b[93m', // Bright Yellow
    '\x1b[94m', // Bright Blue
    '\x1b[95m', // Bright Magenta
    '\x1b[96m', // Bright Cyan
];

// Reset color
const reset = '\x1b[0m';

// Terminal control
function clearScreen() {
    process.stdout.write('\x1b[2J');
    process.stdout.write('\x1b[0f');
}

function moveTo(x, y) {
    process.stdout.write(`\x1b[${y};${x}H`);
}

// Generate random integer between min and max (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Draw a firework at (cx, cy) with given radius and color
function drawFirework(cx, cy, radius, color) {
    const points = [];
    for (let angle = 0; angle < 360; angle += 30) {
        const rad = angle * Math.PI / 180;
        const x = Math.round(cx + Math.cos(rad) * radius);
        const y = Math.round(cy + Math.sin(rad) * radius * 0.5); // slightly squished for terminal
        points.push({ x, y });
    }
    for (const pt of points) {
        moveTo(pt.x, pt.y);
        process.stdout.write(color + '*' + reset);
    }
}

// Animate a single firework
async function animateFirework(width, height) {
    // Firework launch position
    const cx = randInt(8, width - 8);
    const cy = randInt(6, Math.floor(height/2));
    const color = colors[randInt(0, colors.length - 1)];

    // Animate explosion
    for (let r = 1; r <= 6; r++) {
        clearScreen();
        drawFirework(cx, cy, r, color);
        await new Promise(res => setTimeout(res, 80));
    }

    // Fade out
    for (let fade = 0; fade < 2; fade++) {
        clearScreen();
        if (fade === 0) drawFirework(cx, cy, 6, color);
        await new Promise(res => setTimeout(res, 60));
    }
}

// Fireworks show!
async function fireworksShow() {
    // Hide cursor
    process.stdout.write('\x1b[?25l');
    readline.emitKeypressEvents(process.stdin);

    const { columns: width = 80, rows: height = 24 } = process.stdout;
    let running = true;

    // Allow user to exit with any key
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', () => {
        running = false;
    });

    clearScreen();
    moveTo(1, 2);
    process.stdout.write('\x1b[1mWelcome to the ASCII Fireworks Show! Press any key to exit.\x1b[0m');

    while (running) {
        await animateFirework(width, height);
        if (!running) break;
        await new Promise(res => setTimeout(res, randInt(200, 800)));
    }

    // Restore cursor and clear screen
    process.stdout.write('\x1b[?25h');
    clearScreen();
    moveTo(1, 2);
    process.stdout.write('Thanks for watching! 🎆\n');
    process.exit();
}

// Only run if executed directly
if (require.main === module) {
    fireworksShow();
}