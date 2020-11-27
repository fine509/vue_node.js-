// 创建集合规则的文件  存钱能手

const mongoose = require('mongoose')

//创规则
const BorrowSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    desc: {
        type: String
    }
})

//创集合
const Borrow = mongoose.model("borrow", BorrowSchema)

module.exports = Borrow