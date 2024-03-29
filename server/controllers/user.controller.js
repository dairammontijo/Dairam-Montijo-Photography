const User = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports = {

    register: (req, res) => {
        const user = new User(req.body)
        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log("Succesful registration!")
                res.json({
                    successMessage: "Thank you for registering",
                    user: newUser
                })
            })
            .catch((err) => {
                console.log("registration not successful")
                res.status(400).json(err)
            })
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((userRecord) => {
                if (userRecord === null) {
                    res.status(400).json({ message: "Invalid Login attempt" })
                }
                else {
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                console.log("password is valid");
                                res.cookie(
                                    "userToken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                        {
                                            httpOnly: true,
                                            expires: new Date(Date.now() + 9000000)
                                        }
                                ).json({
                                    message: "Successfully logged in",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                });
                            }
                            else {
                                res.status(400).json({ message: "Invalid attempt" }) 
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({ message: "Invalid Attempt 2" });
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({ message: "Invalid Attempt 3" });
            })
    },


    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("userToken");
        res.json({
            message: "You have successfully logged out!"
        })
    }, 


    getLoggedInUser: (req, res) => {

        // const decodedJWT = jwt.decode(req.cookies.userToken, {
        //     complete: true
        // })

        User.findOne({_id: req.jwtpayload.id})
            .then((user) => {
                console.log(user)
                res.json(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}