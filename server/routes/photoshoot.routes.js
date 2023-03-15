const PhotoShootController = require("../controllers/photoshoot.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app) =>{

    app.get("/api/photoshoots", PhotoShootController.findAllPhotoShoots)

    app.post("/api/photoshoots", authenticate ,PhotoShootController.createNewPhotoShoot)

    app.get("/api/photoshoots/:id", PhotoShootController.findOnePhotoShoot)

    app.delete("/api/photoshoots/:id", PhotoShootController.deletePhotoShoot)

    app.put("/api/photoshoots/:id", PhotoShootController.updatePhotoShoot)
    
    app.get("/api/photoshootsByUser/:username", authenticate, PhotoShootController.findAllPhotoShootsByUser)

    
}