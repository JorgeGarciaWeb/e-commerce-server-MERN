const router = require("express").Router()

//GAMES ROUTES
router.use("/games", require('./games.routes'))

//AUTH ROUTES
router.use("/auth", require("./auth.routes"))

//USER ROUTES
router.use('/user', require('./user.routes'))

//CART ROUTES
router.use('/cart', require('./cart.routes'))

//FAVORITES ROUTES
router.use('/favorites', require('./favorites.routes'))

//UPLOAD ROUTES
router.use('/upload', require('./upload.routes'))



module.exports = router