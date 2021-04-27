const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const passport = require("passport")
const bodyParser = require("body-parser")

const User = require("../../models/User")

router.post("/register", (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json("邮箱已被注册！")
            } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            newUser.save()
                    .then(user => res.json({user}))
                    .then(err => console.log(err))
            }
        })
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(400).json("用户不存在")
            }else{
                if(password!==user.password){
                    return res.status(400).json("密码错误")
                }
                res.json({
                    success: true,
                    email:user.email
                })
            }
        })
})

module.exports = router;