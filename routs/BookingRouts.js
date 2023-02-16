const express = require('express')
const router = express.Router()
const Booking = require('../models/BookingModels')
const Cam = require('../models/CamModels')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51MaVj0SFvXd0rfvLripwPHGBtr7MS1sr4y38SKuci6YbvNXW4UoANIA9SY40VB36Mtlg2mFRGhcXPw4tTDFytekX00nEcmnoxe')



router.post("/bookcam", async (req, res) => {

    const { token } = req.body
    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })


        const payment = await stripe.paymentIntents.create({
            amount: req.body.totalAmount * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()

        })

        if (payment) {

            req.body.transactionId = payment.id

            const newBooking = Booking(req.body)
            await newBooking.save()
            const cam = await Cam.findOne({ _id: req.body.cam })

            res.send('Your Booking Is Successfull')
            cam.bookedTimeSlots.push(req.body.bookedTimeSlots)

            await cam.save()

        }

        else {
            return res.status(400).json(error)
        }



    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }


})

router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find().populate('cam')

        res.send(bookings)

    }
    catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

module.exports = router