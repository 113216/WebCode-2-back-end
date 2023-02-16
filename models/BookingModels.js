const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({


    cam: { type: mongoose.Schema.Types.ObjectId, ref: 'cam' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookedTimeSlots: {
        from: { type: String },
        to: { type: String }
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String }
},
    { timestamps: true }

)

const BookingModel = mongoose.model('bookings', bookingSchema)
module.exports = BookingModel