//Using stubs
const Service = require('./service')
const sinon = require('sinon')
const BASE_URL = "https://localhost:3030/request/1613432264789"

const requestMock = require('./mocks/request.json')

;(async () => {

    {
        const service = new Service()
        const stub = sinon.stub(service, service.makeRequest.name)

        stub
            .withArgs(BASE_URL)
            .resolves(requestMock)

    }

})()