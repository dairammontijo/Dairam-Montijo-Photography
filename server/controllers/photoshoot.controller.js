const PhotoShoot = require('../model/photoshoot.model')
const jwt = require("jsonwebtoken")
const User = require("../model/user.model")




module.exports = {
    findAllPhotoShoots: (req, res) => {
        PhotoShoot.find()
            .populate("createdBy", "username email")
            .then((allPhotoShoots) => {
                console.log(allPhotoShoots)
                res.json(allPhotoShoots)
            })
            .catch((err) => {
                console.log("findAllPhotoShoots failed");
                res.json({ message: "Soething went wrong in findAllPhotoShoots", error: err })
            })
    },

    createNewPhotoShoot: (req, res) => {

        const newPhotoShootObject = new PhotoShoot(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken,{
            complete: true
        })

        newPhotoShootObject.createdBy = decodedJWT.payload.id

        newPhotoShootObject.save()

            .then((newPhotoShoot) => {
                console.log(newPhotoShoot)
                res.json(newPhotoShoot)
            })
            .catch((err) => {
                console.log("Something went wrong in createNewPhotoShoot");
                res.status(400).json(err);
            })
    },

    findOnePhotoShoot: (req, res) => {
        PhotoShoot.findOne({_id: req.params.id})
            .then((onePhotoShoot) => {
                console.log(onePhotoShoot);
                res.json(onePhotoShoot)
            })
            .catch((err) => {
                console.log("findPhotoShootOnefailed")
                res.json({ message: "Soething went wrong in findOnePhotoShoots", error: err })
            })
    },

    deletePhotoShoot: (req, res) => {
        PhotoShoot.deleteOne({_id: req.params.id})
            .then((deletedPhotoShoot) => {
                console.log(deletedPhotoShoot);
                res.json(deletedPhotoShoot)
            })
            .catch((err) => {
                console.log("deleteOnePhotoShoot failed");
                res.json({ message: "Soething went wrong in deletingPhotoShoot", error: err })
            })
    },

    updatePhotoShoot: (req, res) => {
        PhotoShoot.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
            )
            .then((updatedPhotoShoot) => {
                console.log(updatedPhotoShoot);
                res.json(updatedPhotoShoot)
            })
            .catch((err) => {
                console.log("Smething went wrong in updatePhotoShoot")
                res.status(400).json(err);
            })
    },


    findAllPhotoShootsByUser: (req, res) => {

        if(req.jwtpayload.username !== req.params.username){
            console.log("not the user");

            User.findOne({username: req.params.username})
                .then((userNotLoggedIn) => {
                    PhotoShoot.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allPhotoShootsFromUser) => {
                            console.log(allPhotoShootsFromUser);
                            res.json(allPhotoShootsFromUser);
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).jason(err);
                        })
                        
                })            
        }
        else{
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            PhotoShoot.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allPhotoShootsFromLoggedInUser) => {
                    console.log(allPhotoShootsFromLoggedInUser);
                    res.json(allPhotoShootsFromLoggedInUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }

}
