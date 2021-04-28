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
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.status(200).json({user}))
                    .then(err =>{})
                })
            })
           
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
                bcrypt.compare(password, user.password)
                      .then(isMatch =>{
                        if(isMatch){
                            const rule = {id: user.id, name: user.name,};
                            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                        }else{
                            return res.status(400).json("账号或者密码错误")
                        }
                      })
            }
        })
})

module.exports = router;