require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const requestRouter = require('./routes/request');
const checkAuth = require('./middleware/check-auth');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected!")
})
.catch(err => console.log(err))

const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use(cors());
app.use(logger('[:date[clf]] | ":method :url HTTP/:http-version" | STATUS: :status | CONTENT_LENGTH: :res[content-length] | RESPONSE_TIME: :response-time ms'));
app.use(healthRouter)
app.use("/auth", authRouter)
app.use("/request", checkAuth, requestRouter)

app.use((req, res, next) => {
    res.status(404).send('<h1>Not Found!</h1>')
})

module.exports = app;
