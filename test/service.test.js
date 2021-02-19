//Using stubs
const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
const BASE_URL_1 = "https://localhost:3030/request/1613432264789"
const BASE_URL_2 = "https://localhost:3030/request/requester/1613432264789"

const requestMock = require('./mocks/request.json')

;(async () => {

    
    const service = new Service()
    const stub = sinon.stub(service, service.makeRequest.name)

    stub
        .withArgs(BASE_URL_1)
        .resolves(requestMock)

    stub
        .withArgs(BASE_URL_2)
        .resolves(requestMock)

    {
        const expected = {
            "name": "test",
            "id": "BA321"
        }
        const results = await service.getRequester(BASE_URL_2)
        deepStrictEqual(results, expected)
    }

})()