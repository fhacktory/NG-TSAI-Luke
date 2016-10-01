const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './front/index.jsx',
        vendor: './front/vendor.jsx'
    },

    output: {
        filename: './dist/[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx$|\.js/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: './front/index.html'
        })
    ]
};