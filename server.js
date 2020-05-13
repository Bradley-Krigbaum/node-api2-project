
const express = require('express');
const server = express();

server.use(express.json());



server.get('/', (request, response) => {
    response.send(`
    	<h2>Lambda Node Api 2 Project</h2>
    	<p>Welcome to the DataBase!</p>
	`);
});



module.exports = server;