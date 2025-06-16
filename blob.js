// blob.js
// Generates ASCII art blobs

function generateAsciiBlob(width = 16, height = 8) {
    // Randomly fill a grid with "blob" characters ('@') and spaces
    const chars = [' ', ' ', ' ', '@', '@', 'O', 'o', '*'];
    let blob = '';
    for (let y = 0; y < height; y++) {
        let line = '';
        for (let x = 0; x < width; x++) {
            // Make the edge less likely to have a blob character
            if (
                x === 0 ||
                y === 0 ||
                x === width - 1 ||
                y === height - 1
            ) {
                line += ' ';
            } else {
                line += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        blob += line + '\n';
    }
    return blob;
}

// Example usage:
if (require.main === module) {
    console.log(generateAsciiBlob());
}

// Export for use as a module
module.exports = {
    generateAsciiBlob,
};