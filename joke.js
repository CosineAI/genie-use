/**
 * joke.js
 * A simple script that tells a random joke when run.
 */

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "Why don’t skeletons fight each other? They don’t have the guts.",
  "What do you call fake spaghetti? An impasta!",
  "How does a penguin build its house? Igloos it together.",
  "Why did the math book look sad? Because it had too many problems.",
  "What do you call cheese that isn't yours? Nacho cheese!",
  "Why couldn't the leopard play hide and seek? Because he was always spotted.",
  "Why did the computer go to the doctor? Because it had a virus!"
];

function tellJoke() {
  const idx = Math.floor(Math.random() * jokes.length);
  console.log(jokes[idx]);
}

tellJoke();