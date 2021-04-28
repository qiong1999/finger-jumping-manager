const express = require('express')
const router = express.Router();
const passport = require('passport')

router.get('/fingerJumping', passport.authenticate('jwt', {session: false}),
(req, res) => {
  // console.log(req)
   res.json("访问到了")
    
})

module.exports = router