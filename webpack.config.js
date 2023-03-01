const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        order: path.resolve(__dirname, 'front/js/order/index.js'),
        tablepage: path.resolve(__dirname, 'front/js/tablepage/index.js'),
        typespage: path.resolve(__dirname, 'front/js/typespage/index.js'),
        calculator: path.resolve(__dirname, 'front/js/calculator/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist/static/js'),
        filename: '[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
              test: /\.pug$/,
              loader: '@webdiscus/pug-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            title: 'order',
            filename: '../../templates/order.html',
            template: path.join(__dirname, 'front/templates/order/index.pug'),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'tablepage',
            filename: '../../templates/tablepage.html',
            template: path.join(__dirname, 'front/templates/tablepage/index.pug'),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'typespage',
            filename: '../../templates/typespage.html',
            template: path.join(__dirname, 'front/templates/typespage/index.pug'),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'calculator',
            template: path.join(__dirname, 'front/templates/calculator/index.pug'),
            filename: '../../templates/calculator.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'front/js/components'), to: path.resolve(__dirname, 'dist/static/js/components')},
                {from: path.resolve(__dirname, 'front/svg'), to: path.resolve(__dirname, 'dist/static/svg')}
            ]
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        devMiddleware: {
          writeToDisk: true,
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    }
}