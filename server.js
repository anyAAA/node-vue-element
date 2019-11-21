const express = require("express");
const mongoose = require("mongoose"); // 引入 mongoose   
const bodyParser = require("body-parser");
const passport = require("passport")
const app = express();

// 引入users.js
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

// DB config
const db = require('./config/keys').mongoURL

// 使用 body-parser中间件
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Connect to mongdb  通过 mongoose 来连接我们的数据库
// mongoose.Promise = global.Promise

// 连接 mongdb
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("数据库连接成功"))
    .catch(err => console.log(err))

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport); // 最后的这个passport,是最上面引入的passport,需要传递给 passport.js 里

// 设置路由  app.get("/", (req, res) => { res.send("Hello World!") })

// 使用 routes 设置路由   当访问 api/users 的时候 就会自动使用后面的 users 也就是上面我们引入的users
app.use("/api/users", users)
app.use("/api/profiles", profiles)

const port = process.env.PORT || 5000; // 端口号

app.listen(port, () => {
    console.log(`服务正在运行Server running on port ${port}`)
})