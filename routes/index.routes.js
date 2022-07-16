const router = require("express").Router();

//Ruta de juegos
router.use("/games", require('games.routes'))





module.exports = router;
