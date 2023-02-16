const express = require("express")
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3003
const dbConnection = require('./db')
dbConnection.connectDB()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use('/api/cam/', require('./routs/CamRouts'))
app.use('/api/users/', require('./routs/UsersRouts'))
app.use('/api/bookings/', require('./routs/BookingRouts'))
app.get('/', (req, res) => res.send('Hellow World'))
app.listen(port, () => console.log(`node server start ${port}`))