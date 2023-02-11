const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            title: 'order',
            filename: '../../templates/order.html',
            template: 'front/order/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'tablepage',
            filename: '../../templates/tablepage.html',
            template: 'front/tablepage/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'typespage',
            filename: '../../templates/typespage.html',
            template: 'front/typespage/index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'calculator',
            filename: '../../templates/calculator.html',
            template: 'front/calculator/index.html'
        })
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