const mongoose = require('mongoose')

const CamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    model: { type: String, required: true },

    bookedTimeSlots: [{
        from: { type: String, required: true },
        to: { type: String, required: true }
    }],

    rentPerHour: { type: Number, required: true },


},
    { timestamps: true }

)

const CamModels = mongoose.model('cam', CamSchema)
module.exports = CamModels