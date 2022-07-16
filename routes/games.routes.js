const router = require("express").Router()

const Game = require('./../models/Games.model')


router.get("/getgames", (req, res) => {

    Game
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router
