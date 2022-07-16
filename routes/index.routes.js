const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("Lo tienes tio");
})

//USER ROUTES
router.use('/', require('./user.routes.js'))

module.exports = router;
