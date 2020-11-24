const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.status(200).send('<h1>API Running!</h1>')
})

module.exports = router
