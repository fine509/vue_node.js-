//连接数据库的主文件

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('数据库连接成功'); })
    .catch((err) => {
        err,
        console.log('数据库连接失败');

    })