const router = require("express").Router()

const bcryptjs = require('bcryptjs')
const saltRounds = 10

const User = require('../models/User.model')


//SIGNUP
router.get('/signup', (req, res, next) => res.json('auth/signup'))

router.post('/signup', (req, res, next) => {

    const { name, username, email, password } = req.body


    if (email.length === 0 || password.length === 0) {
        res.json('auth/signup', { errorMessage: 'The field is obligatory' })

        return

    }

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashPassword => User.create({ name, username, email, password: hashPassword }))
        .then(() => res.json('/'))
        .catch(error => next(new Error(error)))

})

//LOG-IN
// router.get('/login', (req, res, next) => res.send('auth/login'))

// router.post('/login', (req, res, next) => {

//     const { email, password } = req.body

//     if (email.length === 0 || password.length === 0) {
//         res.render('auth/login', { errorMessage: 'The field is obligatory' })
//         return
//     }
// })


module.exports = router