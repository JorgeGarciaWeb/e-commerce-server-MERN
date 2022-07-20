const router = require("express").Router()

//GAMES ROUTES
router.use("/games", require('./games.routes'))

//AUTH ROUTES
router.use("/auth", require("./auth.routes"))

//USER ROUTES
router.use('/', require('./user.routes'))

//CART ROUTES
router.use('/cart', require('./cart.routes'))

module.exports = router