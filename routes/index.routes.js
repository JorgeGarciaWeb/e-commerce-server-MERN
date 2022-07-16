const router = require("express").Router()

//Ruta de juegos
router.use("/games", require('./games.routes'))




router.get("/", (req, res, next) => {
  res.json("Lo tienes tio");
})

//USER ROUTES
router.use('/', require('./user.routes.js'))

module.exports = router;
