const express = require('express')
const router = express.Router()
const Cam = require('../models/CamModels')

router.get('/getallcams', async (req, res) => {
    try {
        const cam = await Cam.find();
        console.log(cam)
        res.send(cam)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }
})


router.post('/addcam', async (req, res) => {
    try {
        const newcam = new Cam(req.body)
        await newcam.save()
        res.send('Cam Added Successfully')
    }
    catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }
})

router.post('/edit', async (req, res) => {
    try {
        const cam = await Cam.findOne({ _id: req.body._id })
        cam.name = req.body.name
        cam.model = req.body.model
        cam.image = req.body.image
        cam.rentPerHour = req.body.rentPerHour

        await cam.save()
        res.send('Cam edited Successfully')
    }
    catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }
})

router.post('/delete', async (req, res) => {
    try {
        const cam = await Cam.findOneAndDelete({ _id: req.body.camid })

        res.send('Cam deleted Successfully')
    }
    catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }
})

module.exports = router;