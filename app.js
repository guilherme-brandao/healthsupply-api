require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const healthRouter = require('./routes/health');

const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use(cors());
app.use(bodyParser.json());
app.use(logger('[:date[clf]] | ":method :url HTTP/:http-version" | STATUS: :status | CONTENT_LENGTH: :res[content-length] | RESPONSE_TIME: :response-time ms'));
app.use(healthRouter)

app.use((req, res, next) => {
    res.status(404).send('<h1>Not Found!</h1>')
})

module.exports = app;
