// 创建集合规则的文件  上传图片选择

const mongoose = require('mongoose')


const ImageSchema = new mongoose.Schema({
    imgUrl:{
        type:String,
        default:''
    }
})
//创集合

const Image = mongoose.model("image", ImageSchema)

module.exports = Image