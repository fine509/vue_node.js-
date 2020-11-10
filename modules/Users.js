// 创建集合规则的文件

const mongoose = require('mongoose')

//创规则   用户数据
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,

    },
    identity: {
        type: String,


    },
    date: {
        type: Date,
        default: Date.now
    }


})

//创集合
const User = mongoose.model("users", UserSchema)

module.exports = User