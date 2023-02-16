const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
})
const UserModels = mongoose.model('User', UserSchema)
module.exports = UserModels