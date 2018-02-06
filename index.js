if (process.browser) {
    // Webbrowser
    module.exports = new (require('./src/IntituleWebbrowser'));
} else {
    // Nodejs
    module.exports = new (require('./src/IntituleNodejs'));
}
