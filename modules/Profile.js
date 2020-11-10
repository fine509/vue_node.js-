// 创建集合规则的文件  资金管理数据

const mongoose = require('mongoose')

//创规则
const ProfileSchema = new mongoose.Schema({

    type: {
        type: String,
    },
    describe: {
        type: String,
    },
    incode: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        required: true
    },



})

//创集合
const Profile = mongoose.model("profiles", ProfileSchema)

module.exports = Profile