const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const uglifyjsplugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');
module.exports = {
    //输入
    entry: './server.js',
    //输出
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: 'dist/' //这个是为了以后在引用图片的时候会自动加入这个路劲头，因为图片都是放在这个路劲里面的。
    },
    //进行一些css,less等配置
    module: {
        rules: [{
                test: /\.css$/, //匹配所有css文件
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/, //匹配所有less文件
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i, //匹配所有图片
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 3000, //文件大小,当加载的图片小于Limit时，会将图片编译成base64字符串形式，当加载的图片大于limit时，就要安装file-loader模块，这时候就将这个图片进行打包，放在dist里面，而在最前面的输出那里，就需要加上一个东西。     
                        name: 'img/[name].[hash:8].[ext]' //打包的图片是通过哈希算法自动生成的很乱，所以要自己加名字+哈希值：8.ext扩展名，img表示是在img文件夹下，[name]表示打包后名字依然传过去了，hash:8是加上八位哈希值，.ext是后缀
                    }
                }]
            },
            //转化ES6
            {
                test: /\.js$/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //配置vue
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]

    },
    plugins: [
        new webpack.BannerPlugin('最终版权归林敏华所有'),
        new HtmlWebpackPlugin({ template: './client/public/index.html' }),
        new uglifyjsplugin()
    ]

}