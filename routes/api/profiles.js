// @login & register
const express = require("express");
const router = express.Router();
const passport = require('passport')

const Profile = require("../../models/Profile") // 引入规范模块

// $route GET  api/profile/test
// @desc  返回请求的json数据
// @access  public 
router.get("/test", (req, res) => {
    // 返回一个json数据 
    res.json({
        msg: "login works"
    })
})


// $route POST  api/profile/add    添加数据 
// @desc  创建信息接口
// @access Private  
//  passport....   验证 token 
router.post(
    '/add',
    passport.authenticate("jwt", {
        session: false
    }), (req, res) => {
        // 首先需要确定所填写的信息是存在的
        const profileFields = {};

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expend) profileFields.expend = req.body.expend;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;

        new Profile(profileFields).save().then(Profile => {
            res.json(Profile);
        })

    })

// $route GET  api/profiles    获取所有信息 
// @desc  获取所有信息
// @access Private  
//  passport....   验证 token 
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }), (req, res) => {
        // 查询profile的所有信息
        Profile.find()
            .then(profile => {
                if (!profile) {
                    return res.status(404).json("没有任何内容")
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err))
    })

// $route GET  api/profile:id    获取单个信息 
// @desc  获取单个信息
// @access Private  
//  passport....   验证 token 
router.get(
    "/:id",
    passport.authenticate("jwt", {
        session: false
    }), (req, res) => {
        // 查询profile的所有信息
        Profile.findOne({
                _id: req.params.id
            })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json("没有任何内容")
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err))
    })

// $route POST  api/profile/edit    编辑数据 
// @desc  编辑信息接口
// @access Private  
//  passport....   验证 token 
router.post(
    '/edit/:id',
    passport.authenticate("jwt", {
        session: false
    }), (req, res) => {
        // 首先需要确定所填写的信息是存在的
        const profileFields = {};

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expend) profileFields.expend = req.body.expend;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;

        Profile.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: profileFields // 更新变量
        }, {
            new: true
        }).then(profile => res.json(profile))

    })

// $route POST  api/profile/delete/:id    删除数据 
// @desc  删除信息接口
// @access Private  
//  passport....   验证 token
router.delete(
    "/delete/:id",
    passport.authenticate("jwt", {
        session: false
    }), (req, res) => {
        Profile.findOneAndDelete({
            _id: req.params.id
        }).then(profile => {
            profile.save().then(profile => res.json(profile))
        }).catch(err => res.status(404).json("删除失败"))
    })

module.exports = router