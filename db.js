const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
async function connectDB() {


    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.mongodb)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDB }