const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const User = require('../models/User.model')

router.get('/profile/:user_id', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .populate('favorites')
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.put('/profile/edit/:user_id', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    User
        .findByIdAndUpdate(user_id, req.body)
        .then(response => res.json(response))
        .catch(err => console.log(err))

})



module.exports = router