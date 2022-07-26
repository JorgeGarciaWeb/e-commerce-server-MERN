const router = require("express").Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const User = require("../models/User.model")
const Game = require('./../models/Game.model')


router.get("/getAllGames", isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    const promises = [
        Game.find(),
        User.findById(user_id).select('favorites')
    ]

    Promise
        .all(promises)
        .then(([gamesList, userFavs]) => res.json({ gamesList, favorites: userFavs.favorites }))
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

    const { name } = req.query

    Game
        .find({ name: new RegExp(name, 'i') })
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
