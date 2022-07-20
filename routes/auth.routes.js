const express = require("express")
const bcrypt = require('bcrypt')
const User = require('../models/User.model')

const jwt = require("jsonwebtoken")

const { isAuthenticated } = require('../middleware/jwt.middleware')

const router = require("express").Router()
const saltRounds = 10

//SIGNUP
router.post('/signup', (req, res, next) => {

    const { name, email, password, username } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ name, email, password: hashedPassword, username })

        })
        .then((createdUser) => {

            const { email, username, _id } = createdUser
            const user = { email, username, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error' })
        })
})

//LOGIN
router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Provide email and password' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: 'User not found' })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, items } = foundUser

                const payload = { _id, email, username, items }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }

                )

                res.status(200).json({ authToken: authToken })

            }

            else {
                res.status(401).json({ message: 'Unable to authenticate the user' })
            }
        })
        .catch(err => console.log(err))
})

router.get('/verify', isAuthenticated, (req, res) => {

    console.log('token', req.payload)
    setTimeout(() => {
        res.status(200).json(req.payload)
    }, 3500)
})

module.exports = router