// 创建集合规则的文件  上传图片选择

const mongoose = require("mongoose");

const encryptedSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  question1: {
    type: String,
    required: true,
  },
  question2: {
    type: String,
    required: true,
  },
  answer1: {
    type: String,
    required: true,
  },
  answer2: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
//创集合

const Encrypted = mongoose.model("encrypted", encryptedSchema);
module.exports = Encrypted;
