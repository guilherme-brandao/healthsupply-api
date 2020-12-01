const mongoose = require('mongoose');
const Utils = require('../utils/utils');
const Request = require('../models/request');
const moment = require('moment');

exports.createRequest = async (req, res, next) => {

    var attachments = req.files;
    var request = JSON.parse(req.body.request);
    console.log(request)
    console.log(typeof request)

    if (attachments && attachments.length > 0) {
        let requestWithAttachments = await Utils.handleAttachments(request, attachments);
        var requestJSON = requestWithAttachments;
    }

    let requestSchema = new Request({
        _id: new mongoose.Types.ObjectId(),
        requestID: Utils.generateId(),
        type: "REQUEST",
        date: new Date(),
        dateLastUpdate: new Date(),
        supplierName: requestJSON.supplierName,
        supplierID: requestJSON.supplierID,
        requesterName: requestJSON.requesterName,
        requesterID: requestJSON.requesterID,
        description: requestJSON.description,
        attachments: requestJSON.attachments,
        itens: requestJSON.itens,
        status: "PENDING"
    });

    requestSchema.save(function (err, obj) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json({ codigo: '0', retorno: obj });
        console.log("Request inserted successfully!");
    });

}

exports.getRequests = async (req, res, next) => {
    let selector = {}
    let query = selector

    selector.type = "REQUEST"

    Request.find(query).sort({ $natural: -1 })
        .exec()
        .then(s => {
            if (s) {
                res.status(200).json(s)
            } else {
                res.status(404).json({ message: "No data found!" })
            }

        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
