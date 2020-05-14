
const express = require('express');
const server = express();
const dbRouter = require('./data/db_router.js');

server.use(express.json());
server.use('/api/posts', dbRouter);

server.get('/', (request, response) => {
    response.send(`
    	<h2>Lambda Node Api 2 Project</h2>
    	<p>Welcome to the DataBase!</p>
	`);
});



module.exports = server;