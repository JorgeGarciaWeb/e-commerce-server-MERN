const router = require("express").Router()

const uploader = require('./../config/cloudinary.config')

router.post('/image', uploader.array('imageData'), (req, res) => {

    if (!req.files) {
        res.status(500).json({ errorMessage: 'Error load the file' })
    }

    const response = req.files.map(elm => elm.path)

    res.json(response)
})

module.exports = router