const mongoose = require('mongoose');
const Utils = require('../utils/utils');
const File = require("../models/file");
const Request = require('../models/request');

exports.createRequest = async (req, res, next) => {

    var attachments = req.files[i];
    var request = req.body.request;
    var requestJSON = JSON.parse(request);

    if (attachments && attachments.length > 0) {
        let requestWithAttachments = await Utils.handleAttachments(requestJSON, attachments);
        requestJSON = requestWithAttachments;
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

    selector.tipo_ativo = "REQUEST"
    if (req.query.status != ' ') selector.status = req.query.status
    if (req.query.data != '') {
        selector.data = {
            $gte: moment(req.query.data),
            $lte: moment(req.query.data).endOf('day')
        }
    }

    Solicitacao.find(query).sort({ $natural: -1 })
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
