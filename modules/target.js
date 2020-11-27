// 创建集合规则的文件  存钱能手

const mongoose = require('mongoose')

//创规则
const TorgetSchema = new mongoose.Schema({})

//创集合
const Torget = mongoose.model("torget", TorgetSchema)

module.exports = Torget