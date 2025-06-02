function helloWorld() {
    console.log("Hello, World!");
}

// For demonstration, call the function if this script is run directly
if (require.main === module) {
    helloWorld();
}

module.exports = { helloWorld };