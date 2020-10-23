const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    // devtool: 'none',
    optimization: {
        usedExports: true,
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        hot: true
    },
    // entry 入口文件， 可以为 字符串 数组 和 对象， 字符串表示是 单入口文件， 数组表示是 多入口文件，但不能指定对应的chunk名， 对象表示是 多入口文件，可以指定对应的chunk 名。
    entry: {
        main: './src/index.js'
    },
    // output 输出文件， 必须为一个对象
    output: {
        // publicPath: 'https://cnd.example.com', // 加上打包文件的前缀，有时候 我们想把打包出来的资源放在cdn 上面，就可以使用publicPath 去配置公共前缀。
        filename: '[name].js', // [name]表示是占位符， 当项目是多页面应用的时候，需要用占位符来确保每个文件具有独立的名称。
        path: path.resolve(__dirname, 'dist') // 表示是根目录下的  bundle 文件夹之下
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'], // 还需要安装 @babel/core 
                include: path.resolve(__dirname, 'src')
            }, {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: true, // 实现less 模块化
                    }
                }, 'less-loader', 'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // rem 相对 px 转换的单位，1rem = 75px
                            remPrecision: 8 // px 转化为 rem 小数点的位数
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'node_modules')

            }, {
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/, // 条件匹配，还可以是 include 和 exclude 三个配置来选中 loader 要应用规则的文件
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 10240,
                        outputPath: 'images/' // 将图片打包进某个具体的文件夹中
                    }
                }
            }]
    },
    plugins: [
        // 模板html文件，将最终生成的js,css 资源文件放进index.html中
        new htmlWebpackPlugin({
            template: './index.html',
            title: 'Hit',
            inject: true, // 可选值有 true 或者 body[所有的js资源插入到body元素的底部] head[所有js资源插入到heade元素中] false [所有的css,js 资源都不会注入到模板文件中]
            minify: false, // 是否压缩html
        }),
        // 每次打包前，将上一次的打包内容清除掉。
        new CleanWebpackPlugin(),
        // 与 devServe 中的hot: true 配合使用，实现 热更新。
        new webpack.HotModuleReplacementPlugin()
    ]
}