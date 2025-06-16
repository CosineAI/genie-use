// joke.js
// Simple funny joke generator

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why don’t skeletons fight each other? They don’t have the guts.",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Did you hear about the mathematician who’s afraid of negative numbers? He’ll stop at nothing to avoid them.",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why did the chicken join a band? Because it had the drumsticks!",
  "What do you call fake spaghetti? An impasta!",
  "Why did the coffee file a police report? It got mugged!"
];

/**
 * Returns a random funny joke from the list.
 * @returns {string} A random joke.
 */
function getRandomJoke() {
  const idx = Math.floor(Math.random() * jokes.length);
  return jokes[idx];
}

// Example usage:
if (require.main === module) {
  console.log(getRandomJoke());
}

// Export the generator for use in other modules
module.exports = { getRandomJoke };