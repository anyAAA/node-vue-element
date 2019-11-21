// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport')

const User = require("../../models/User") // 引入规范模块
const keys = require("../../config/keys") // secret

// $route GET  api/users/test
// @desc  返回请求的json数据
// @access  public 
router.get("/test", (req, res) => {
    // 返回一个json数据 
    res.json({
        msg: "login works"
    })
})

// $route POST  api/users/register
// @desc  返回请求的json数据
// @access  public 
router.post('/register', (req, res) => {
    // console.log(req.body)

    // 查询数据库是否拥有邮箱
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            // 判断当前有没有这个 user,如果 user 存在,代表用户名已经被注册过了
            if (user) {
                return res.status(400).json("邮箱已被注册!")
            } else {
                // 准备头像
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                // 准备存储数据
                var newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })
                // 存储数据
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash; // hash 此时就是加密后的password

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})

// $route POST  api/users/login
// @desc  返回 token 用到 jwt passport
// @access  public 
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ // 查询数据库
        email
    }).then(user => {
        if (!user) {
            return res.status(404).json("用户不存在")
        }
        // else 密码匹配 
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const rule = { // 规则
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        identity: user.identity
                    };
                    jwt.sign(rule, keys.secretOrKey, {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    });
                    // res.json({
                    //     msg: "success"
                    // })
                } else {
                    return res.status(400).json("密码错误")
                }
            })
    })
})

// $route Get  api/users/current 
// @desc  return current user 如果正确 返回用户的 user
// @access  Private  私密的

//  假设用户已经拿到 token   验证token
router.get("/current",
    passport.authenticate("jwt", {
        session: false
    }), (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        })
    })


router.get("/",
    passport.authenticate("jwt", {
        session: false
    }), (req, res) => {
        User.find().then(user => {
            if (!user) {
                return res.status(404).json("没有任何用户内容~")
            }
            res.json(user)
        }).catch(err => res.status(404).json(err))
    }
)

module.exports = router