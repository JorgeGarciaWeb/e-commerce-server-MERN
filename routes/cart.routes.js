const router = require('express').Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const User = require('../models/User.model')
router.get('/', (req, res) => {
    res.json("no arriesgo")
})

router.get('/getItems', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .then(user => res.json({ items: user.items }))
        .catch(err => console.log(err))
})

module.exports = router