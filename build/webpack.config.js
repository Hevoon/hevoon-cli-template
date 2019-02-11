const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const isdev = process.env.NODE_ENV === 'development';
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const config = {
    target: 'web',
    entry: path.join(__dirname, '../src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'vue-style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(gif|jpg|svg|png|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        name: '[name].[ext]'
                    }
                }]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'jquery': 'jquery' //这里是增加的
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isdev ? '"development"' : '"production"'
            }
        }),
        new HtmlPlugin({
            template: 'index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
    ]
};

if (isdev) {
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: '8080',
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true,
        inline: true,
        // contentBase: './dist'
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
} else {
    config.entry = {
        app: path.join(__dirname, '../src/main.js'),
        vendor: ['vue']
    };
    config.output.filename = '[name].js';//hash作用到了vendor.js上，chunkhash相当于用了另一个节点
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })//生成的webapck文件单独打包出去，新模块加入时给一个id，
    )

}
module.exports = config;