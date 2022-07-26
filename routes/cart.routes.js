const router = require('express').Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const User = require('../models/User.model')

router.get('/getItems', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    User
        .findById(user_id)
        .select('items')
        .populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'Game'
            }
        })
        .then(({ items }) => res.json({ items }))
        .catch(err => console.log(err))
})


router.put('/addItem', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload
    const { game_id } = req.body

    const item = {
        product: game_id,
        quantity: 1
    }

    User
        .findOne(user_id, { $push: { items: item } }, { new: true })
        .populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'Game'
            }
        })
        .then(response => res.json(response))
        .catch(err => console.log(err))

})

router.put('/removeItem', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload
    const { item_id } = req.body

    User
        .findByIdAndUpdate(user_id, { $pull: { items: { _id: item_id } } }, { new: true })
        .populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'Game'
            }
        })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


module.exports = router