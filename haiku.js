// haiku.js
//
// Requires: npm install openai dotenv
//
// Usage example:
//   const { generateHaiku } = require('./haiku');
//   generateHaiku("sunrise over snowy mountains").then(console.log);

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a haiku based on the user's input prompt.
 * @param {string} prompt - The theme or inspiration for the haiku.
 * @returns {Promise<string>} - The generated haiku as a string.
 */
async function generateHaiku(prompt) {
  if (!openai.apiKey) {
    throw new Error("Missing OPENAI_API_KEY in environment variables");
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // You can change this to a more capable model if available.
    messages: [
      {
        role: "system",
        content: "You are a poet who only writes haikus. Respond only with a haiku in proper form (5-7-5 syllables) and no extra text.",
      },
      {
        role: "user",
        content: `Write a haiku inspired by: "${prompt}"`,
      },
    ],
    max_tokens: 48, // Haikus are short
    temperature: 0.8,
    n: 1,
  });

  const haiku = completion.choices[0]?.message?.content?.trim();
  return haiku;
}

module.exports = { generateHaiku };