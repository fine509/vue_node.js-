const express = require('express'); //引入express框架
const mongoose = require('mongoose') //引入mongoose
const bodyParser = require('body-parser')
const passpost = require('passport')
const app = express(); //创建服务器


require('./modules/index') //引入数据库模块文件 连接数据库
const User = require('./modules/Users') //集合规则




//引入路由
const users = require('./api/users')

const profile = require('./api/profile')
const owe = require('./api/owe')
const borrow = require('./api/borrow')
    //body-parser中间件拦截post参数
app.use(bodyParser.urlencoded({ extended: false }))




//passport初始化
app.use(passpost.initialize())
    //验证用的
require('./config/passport')(passpost)




//设置路由  
//设置中间件处理匹配请求
app.use('/api/users', users)

app.use('/api/profile', profile)

app.use('/api/owe', owe)
app.use('/api/borrow', borrow)
    //端口号
const port = process.env.PORT || 5000;
//监听
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})