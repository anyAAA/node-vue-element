const mongoose = require("mongoose");
// Create Schema  获取规范类
const Schema = mongoose.Schema;

// 制定规范数据格式
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    identity: { // 默认是员工身份就可以了
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // 创建的时候时间是多少, Date.now的时间就是多少
    }
})
// 创建数据模型 并 输出出去
module.exports = User = mongoose.model("users", UserSchema)