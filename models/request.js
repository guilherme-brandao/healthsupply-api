const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    requestID: Number,
    type: String,
    date: Date,
    dateLastUpdate: Date,
    matricula: String,
    supplierName: String,
    supplierID: String,
    requesterName: String,
    requesterID: String,
    description: String,
    attachments: Array,
    itens: Array,
    status: String
})

module.exports = mongoose.model('Request', requestSchema);