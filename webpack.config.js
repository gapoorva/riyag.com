var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: {
        index: './frontend/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    externals: {
        foundation: 'Foundation'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/, 
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            './node_modules/foundation-sites/scss'
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'frontend/assets', to: 'assets'}
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.ProvidePlugin({
            _throttle: ['lodash', 'throttle']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,
        }),
        new NodemonPlugin({
            watch: [
                'frontend/',
                'backend/',
                'dist/'
            ],
            script: 'backend/bin/www'
        })
    ]
};