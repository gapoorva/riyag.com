var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: './frontend/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
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
        })

    ]
};