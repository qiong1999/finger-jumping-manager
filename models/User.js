const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
    },
    data: {
        type: String,
        default: Date.now()
    }
})

module.exports = User = mongoose.model("users", UserSchema)