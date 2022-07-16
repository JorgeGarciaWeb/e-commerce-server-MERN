const router = require("express").Router()

const Game = require('./../models/Games.model')

router.get("/getAllGames", (req, res) => {

    Game
        .find()
        .then(response => res.jason(response))
        .catch(err => res.status(500).json(err))
})


