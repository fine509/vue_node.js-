// 创建集合规则的文件

const mongoose = require("mongoose");

//创规则   用户数据
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  identity: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  color: {
    type: String,
    default: "",
  },
  fruit: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    default:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F04%2F20150804155805_KSQNi.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617701837&t=63ef8e9c2d64f6e1c1ca420c4cfacdd3",
  },
});

//创集合
const User = mongoose.model("users", UserSchema);
console.log(123123);
console.log(4444);
module.exports = User;
