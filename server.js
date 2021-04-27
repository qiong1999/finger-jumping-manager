const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const cors = require('cors')
const app = express()

const users = require("./routes/api/users")

const db = require("./config/keys").mongoURI
mongoose.connect(db)
        .then(()=>console.log("mongoDB Connect"))
        .catch(err => console.log(err))
app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/", users)
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Sever running on port ${port}`)
})