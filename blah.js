// blah.js

/**
 * Generates a random nonsense string composed of random words and characters.
 * @param {number} [length=10] - Number of nonsense words to generate.
 * @returns {string} Nonsense string.
 */
function generateNonsense(length = 10) {
    const syllables = [
        "ba", "zu", "ka", "lo", "mu", "zi", "wo", "ra", "ti", "fe", "gi", "xo", "pl", "sn", "dr", "ul", "ee", "oo"
    ];
    let nonsense = [];
    for (let i = 0; i &lt; length; i++) {
        let word = "";
        const wordLen = Math.floor(Math.random() * 3) + 1; // 1-3 syllables per word
        for (let j = 0; j &lt; wordLen; j++) {
            word += syllables[Math.floor(Math.random() * syllables.length)];
        }
        nonsense.push(word);
    }
    return nonsense.join(" ");
}

// Example usage:
console.log(generateNonsense()); // e.g. "fepl drploo tiwo mu"