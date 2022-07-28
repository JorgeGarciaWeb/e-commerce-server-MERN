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
        .findById(user_id)
        .then(({ items }) => items.some(item => item.product.toString() === game_id))
        .then(exists => {
            if (!exists) {
                return User.findByIdAndUpdate(user_id, { $push: { items: item } }, { new: true })
            } else {
                return User
                    .findById(user_id)
                    .then(({ items }) => {
                        items.forEach(item => { if (item.product.toString() === game_id) item.quantity++ })
                        return User.findByIdAndUpdate(user_id, { items }, { new: true })
                    })
                    .catch(err => console.log(err))
            }
        })
        .then(response => res.json(response))
        .catch(err => console.log(err))

})

router.put('/removeItem', isAuthenticated, (req, res) => {
    const { _id: user_id } = req.payload
    const { game_id } = req.body

    const item = {
        product: game_id,
        quantity: 1
    }

    User
        .findById(user_id)
        .then(({ items }) => items.some(item => {
            if (item.product.toString() === game_id) {
                if (item.quantity === 1) {
                    return true
                }
            }
            return false

        }))
        .then(exists => {
            if (exists) {
                return User.findByIdAndUpdate(user_id, { $pull: { items: item } }, { new: true })
            } else {
                return User
                    .findById(user_id)
                    .then(({ items }) => {
                        items.forEach(item => { if (item.product.toString() === game_id) item.quantity-- })
                        return User.findByIdAndUpdate(user_id, { items }, { new: true })
                    })
                    .catch(err => console.log(err))
            }
        })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

module.exports = router