const router = require('express').Router()

const { isAuthenticated } = require('./../middleware/jwt.middleware')
const User = require('../models/User.model')

router.put('/addToFavorites/:game_id', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload
    const { game_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favorites: game_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.put('/removeFromFavorites/:game_id', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload
    const { game_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favorites: game_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.get('/favorite-games', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .select('favorites')
        .then(response => res.json(response.favorites))
        .catch(err => console.log(err))
})

module.exports = router