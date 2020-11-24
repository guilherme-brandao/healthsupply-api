const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3030;
const HOST = '0.0.0.0';

const server = http.createServer(app);

server.listen(PORT, HOST);

server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})
