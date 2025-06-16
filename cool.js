// cool.js
// Generate an animated, color-cycling ASCII art banner of the user's input in the terminal!

const readline = require('readline');

// ANSI color codes for a rainbow effect
const COLORS = [
  "\x1b[31m", // red
  "\x1b[33m", // yellow
  "\x1b[32m", // green
  "\x1b[36m", // cyan
  "\x1b[34m", // blue
  "\x1b[35m", // magenta
];

// Reset color
const RESET = "\x1b[0m";

// Simple ASCII art for big text (banner style)
function toAsciiArt(text) {
  // For simplicity, define a minimal font for A-Z and 0-9, fallback to normal chars
  const font = {
    'A': ["  ___  ", " / _ \\ ", "/ /_\\ \\", "|  _  |", "| | | |", "\\_| |_/", "       "],
    'B': ["______ ", "| ___ \\", "| |_/ /", "| ___ \\", "| |_/ /", "\\____/ ", "       "],
    'C': [" _____ ", "/  __ \\", "| /  \\/", "| |    ", "| \\__/\\", " \\____/", "       "],
    'D': ["______ ", "|  _  \\", "| | | |", "| | | |", "| |/ / ", "|___/  ", "       "],
    'E': ["______ ", "|  ___|", "| |_   ", "|  _|  ", "| |___ ", "\\____/ ", "       "],
    ' ': ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
    // ... Add more characters as needed
  };
  // Make all letters uppercase for simplicity
  text = text.toUpperCase();
  // Each line of the ASCII art
  let lines = Array(7).fill("");
  for (const char of text) {
    const art = font[char] || [char + " ", char + " ", char + " ", char + " ", char + " ", char + " ", char + " "];
    for (let i = 0; i < lines.length; i++) {
      lines[i] += art[i] + "  ";
    }
  }
  return lines;
}

function animateAsciiArt(text, interval = 120, cycles = 12) {
  const artLines = toAsciiArt(text);
  let colorOffset = 0;
  let cycle = 0;

  // Clear terminal and hide cursor
  process.stdout.write('\x1B[2J\x1B[0f\x1B[?25l');

  const timer = setInterval(() => {
    process.stdout.write('\x1B[0f'); // move cursor to top left
    for (let i = 0; i < artLines.length; i++) {
      let line = "";
      for (let j = 0; j < artLines[i].length; j++) {
        const c = artLines[i][j];
        if (c !== " ") {
          const colorIdx = (colorOffset + j) % COLORS.length;
          line += COLORS[colorIdx] + c + RESET;
        } else {
          line += " ";
        }
      }
      process.stdout.write(line + "\n");
    }
    colorOffset = (colorOffset + 1) % COLORS.length;
    cycle += 1;
    if (cycle >= cycles) {
      clearInterval(timer);
      // Show cursor again
      process.stdout.write('\x1B[?25h');
    }
  }, interval);
}

// Main function to run the cool animation with user input
function runCoolBanner() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Type your name or any text to see something cool: ", (answer) => {
    animateAsciiArt(answer);
    rl.close();
  });
}

// If run as a script
if (require.main === module) {
  runCoolBanner();
}

// Export for testing or reuse
module.exports = {
  toAsciiArt,
  animateAsciiArt,
  runCoolBanner
};