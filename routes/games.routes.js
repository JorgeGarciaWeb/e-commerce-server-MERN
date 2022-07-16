const router = require("express").Router()

const Game = require('./../models/Games.model')


router.get("/getgames", (req, res) => {

    Game
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get("/getgame/:game_id", (req, res) => {

    const { game_id } = req.params

    Game
        .findById(game_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post("/addgame", (req, res) => {

    Game
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post("/updategame", (req, res) => {

    const { game_id } = req.params

    Game
        .findByIdAndUpdate(game_id)
        .then()
})


router.post("/delete-game/:game_id", (req, res) => {

    const { game_id } = req.params

    Game
        .findByIdAndDelete(game_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
