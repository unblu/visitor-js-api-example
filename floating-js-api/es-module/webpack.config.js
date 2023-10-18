const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map", // enhance debugging by adding meta info for the browser devtools
    target: "web",
    devServer: {
        static: './dist',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: './assets' }]
        })
    ]
}