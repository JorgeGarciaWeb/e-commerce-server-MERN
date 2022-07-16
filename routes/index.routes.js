const router = require("express").Router()

//GAME ROUTERS
router.use("/games", require('./games.routes'))

//USER ROUTES
router.use('/', require('./user.routes.js'))

module.exports = router
