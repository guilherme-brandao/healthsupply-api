const https = require('https')

class Service {
    async makeRequest(url) {
        return new Promise((resolve, reject) => {
            https.get(url, response => {
                response.on("data", data => resolve(JSON.parse(data)))
                response.on("error", reject)
            })
        })
    }

    async getRequester(url) {
        const { retorno } = await this.makeRequest(url)
        
        return {
            name: retorno.requesterName,
            id: retorno.requesterID
        }
    }
}

module.exports = Service