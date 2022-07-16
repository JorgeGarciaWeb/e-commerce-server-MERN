const router = require("express").Router()

//GAMES ROUTES
router.use("/games", require('./games.routes'))

//USER ROUTES
router.use('/', require('./user.routes.js'))

module.exports = router