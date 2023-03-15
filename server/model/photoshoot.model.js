const mongoose = require('mongoose');

const PhotoShootShcema = new mongoose.Schema({
    shootFormat: {
        type: String,
        required: [true, "Desired format for the photoshoot is required"],
        minlength: [3, "Please let me know what format you would like."]

    },

    shootType: {
        type: String,
        required: [true, "What kind of photoshoot would you like? This field cannot be left blank"],
        minlength: [3, "Please give a description of the kind of photoshoot you desire."]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})



const PhotoShoot = mongoose.model("PhotoShoot", PhotoShootShcema);

module.exports = PhotoShoot