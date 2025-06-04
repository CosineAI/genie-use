// cool.js
// Run this with: node cool.js

const frames = [
  `😎       `,
  ` 😎      `,
  `  😎     `,
  `   😎    `,
  `    😎   `,
  `     😎  `,
  `      😎 `,
  `       😎`,
  `      😎 `,
  `     😎  `,
  `    😎   `,
  `   😎    `,
  `  😎     `,
  ` 😎      `,
];

const messages = [
  "Stay cool, code cooler! 🚀",
  "You can do anything you set your mind to! 💡",
  "Keep pushing your limits! 💪",
  "Debugging is like being a detective. 🕵️‍♂️",
  "Every bug is an opportunity to learn! 🐞",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animate() {
  process.stdout.write('\x1B[2J\x1B[0f'); // Clear terminal
  console.log("Here's something cool for you:");
  for (let i = 0; i < 3; i++) {
    for (const frame of frames) {
      process.stdout.write(`\r${frame}`);
      await sleep(60);
    }
  }
  process.stdout.write('\n\n');
  const message = messages[Math.floor(Math.random() * messages.length)];
  console.log(message);
}

animate();