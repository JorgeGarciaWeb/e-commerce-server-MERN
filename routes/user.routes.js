const router = require("express").Router()

const { find } = require("../models/User.model")
const User = require('../models/User.model')

router.get('/user:/id', (req, res) => {

    const { user_id } = req.payload

    User
        .find(user_id)
        
})


module.exports = router