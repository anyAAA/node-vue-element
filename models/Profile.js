const mongoose = require("mongoose");
// Create Schema  获取规范类
const Schema = mongoose.Schema;

// 制定规范数据格式
const ProfileSchema = new Schema({
    type: { // 收支类型
        type: String
    },
    describe: { // 描述信息
        type: String
    },
    income: { // 收入
        type: String,
        required: true
    },
    expend: { // 支出
        type: String,
        required: true
    },
    cash: { // 现金
        type: String,
        required: true
    },
    remark: { // 备注
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
// 创建数据模型 并 输出出去
module.exports = Profile = mongoose.model("profile", ProfileSchema)