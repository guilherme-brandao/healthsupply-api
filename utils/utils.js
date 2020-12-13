const File = require("../models/file");

class Uteis {

    static generateId() {
        const random = Math.floor(Math.random() * 1000000000);
        const timestamp = Date.now();
        return random + timestamp;
    }

    // Include the files in DB and in the request
    static async handleAttachments(request, attachments) {

        request.attachments = [];
        for (let i = 0; i < attachments.length; i++) {

            const { originalname: name, size, key, location: url = "" } = attachments[i];

            const file = await File.create({
                name,
                size,
                key,
                url
            });

            let attachment = {};
            attachment.path = file.url;
            attachment.name = name;
            request.attachments.push(attachment);

        }

        return request;
    }

}

module.exports = Uteis
