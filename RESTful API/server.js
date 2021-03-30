require('dotenv').config()
const express       = require('express')
const mongoose      = require('mongoose')
const gamesRouter   = require('./routes/game')
const cors          = require('cors')


//Connect to DB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error => console.error('MyError: ' + error)))
db.once('open', ()=> console.log("Tread softly, the Database is listening"))


//Creating the app / Web Server
const app = express()

//Express middleware
app.use(express.json())

//Allows the server and the client to be on the same machine
app.use(cors({
    origin: '*' // 'http://127.0.0.1:5500' also works
}))

//localhost:9000 Route
app.get('/', (req, res)=>{
    res.status(200).json({'message':'welcome to our games'})
})

//Root Route
app.use('/games', gamesRouter)

//Indicating the Port - Get it from .env or otherwise use the 5000
app.listen(process.env.PORT || 5000, ()=>console.log(`The server is running and it's power is over 9...${process.env.PORT || 5000}`))