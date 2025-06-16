/**
 * Generate a haiku using the OpenAI API based on a user prompt.
 * 
 * Requires the environment variable OPENAI_API_KEY to be set.
 */

const fetch = require('node-fetch');

/**
 * Calls OpenAI's API to generate a haiku based on the user's prompt.
 * @param {string} prompt - The user's prompt or theme for the haiku.
 * @returns {Promise<string>} - The generated haiku.
 */
async function generateHaiku(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable not set.');
  }

  const systemPrompt =
    'You are a poet that writes haikus. Write a single haiku in 3 lines, 5-7-5 syllables, inspired by the following prompt. Do not add any explanations or extra text.';

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.8,
      max_tokens: 64
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${err}`);
  }

  const data = await response.json();
  const haiku = data.choices && data.choices[0] && data.choices[0].message
    ? data.choices[0].message.content.trim()
    : '';

  return haiku;
}

module.exports = { generateHaiku };