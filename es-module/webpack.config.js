const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "dist"), // string
    },
    devtool: "source-map", // enum  // enhance debugging by adding meta info for the browser devtools
    target: "web", // enum  // the environment in which the bundle should run
    serve: { //object
        port: 1337,
        content: './dist',
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './assets' }
        ])
    ]
}