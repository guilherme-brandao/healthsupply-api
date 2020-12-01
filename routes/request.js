const router = require('express').Router()
const controller = require('../controllers/requestController')
const multer = require('multer');
const multerConfig = require('../config/multer')

const uploadMiddleware = multer(multerConfig).array('file');

router.post("/create", uploadMiddleware, controller.createRequest)
router.get("/list", controller.getRequests)


module.exports = router