const mongoose = require("mongoose")

//const dbName = "dairamphotography";

mongoose.connect('mongodb://localhost/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('you are connected to the database called' + " " + process.env.DB_NAME)
    })
    .catch((err) => {
        console.log("there was a problem connecting to the database" + " " + process.env.DB_NAME, err)
    })