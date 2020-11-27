const router = require('express').Router()
const controller = require('../controllers/requestController')
const multer = require('multer');
const httpStatus = require("http-status-codes");
const multerConfig = require('../config/multer')

const multerStorage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: multerStorage}).array('file');

router.post("/create", uploadMiddleware, controller.createRequest)


module.exports = router