require("dotenv").config();
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser")
const app = express();

//Middleware
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(cookieParser())

require('./config/mongoose.config')

//need to require the routes
require('./routes/photoshoot.routes')(app)
require("./routes/user.routes")(app)

app.listen(process.env.MY_PORT, () => console.log("Your are connected to port" + " " + process.env.MY_PORT))
