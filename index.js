if (process.browser) {
    // Webbrowser
    module.exports = new (require('./src/IntituleWebbrowser'));
} else {
    // Nodejs
    let nodeClass = './src/IntituleNodejs';
    module.exports = new (require("'" + nodeClass + "'"));
}
