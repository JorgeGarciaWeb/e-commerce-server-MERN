const router = require('express').Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const User = require('../models/User.model')
const Cart = require('./../models/Cart.model')


router.get('/getItems', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .then(user => res.json({ items: user.items }))
        .catch(err => console.log(err))
})

module.exports = router