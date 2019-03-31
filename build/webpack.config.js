const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';


const config = {
    //webpack4需要的mode属性,development||production
    mode: process.env.NODE_ENV || "production",
    target: 'web',
    entry: path.join(__dirname, '../src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "vue-style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    //postcss插件要放在css与less之间
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    },

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
            {
                //连接.babelrc文件来进行es6转换
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.(js|vue)$/,
                //eslint代码规范
                loader: 'eslint-loader',
                enforce: "pre",
                exclude: [
                    // 隔离node_modules
                    path.resolve(__dirname, '../node_modules')
                ],
                options: {
                    //自动修复
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlPlugin({
            template: 'index.html'
        }),
        //vue-loader15版本起，需要引入这个插件
        new VueLoaderPlugin()
    ]
};

if (isDev) {
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
        new webpack.HotModuleReplacementPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, '../src/main.js'),
        vendor: ['vue']
    };
    //hash作用到了vendor.js上，chunkhash相当于用了另一个节点
    config.output.filename = '[name].js';
    //等同于webpack.optimize.CommonsChunkPlugin
    config.optimization = {
        splitChunks: {
            chunks: 'all'
        },
        //非指定命名文件
        runtimeChunk: true
    };
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css')
    )

}
module.exports = config;