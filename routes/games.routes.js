const router = require("express").Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const User = require("../models/User.model")
const Game = require('./../models/Game.model')


router.get("/getAllGames", (req, res) => {

    Game
        .find()
        .then(games => res.json(games))
        .catch(err => res.status(500).json(err))
})


router.get("/getOneGame/:game_id", (req, res) => {

    const { game_id } = req.params

    Game
        .findById(game_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post("/addGame", isAuthenticated, (req, res) => {

    const { _id: role } = req.payload

    Game
        .create({ role, ...req.body })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put("/updateGame/:game_id", (req, res) => {

    const { game_id } = req.params

    const { name, release, imgs, description, rating, platforms, genre, price, studio } = req.body

    Game
        .findByIdAndUpdate(game_id, { name, release, imgs, description, rating, platforms, genre, price, studio })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getFilteredGames', (req, res) => {

    const { name, platforms } = req.query

    Game
        .find({ name, platforms: new RegExp(name, platforms, 'i') })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deleteGame/:game_id', (req, res) => {

    const { game_id } = req.params

    Game
        .findByIdAndDelete(game_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
