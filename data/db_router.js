const express = require('express');
const DataBase = require('./db.js');

const router = express.Router();


router.get('/', (request, response) => {
	DataBase.find(request.query)
		.then(data => {
			response.status(200).json(data);
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				message: "Error Retrieving The Requested Data."
			});
		});
});

router.get('/:id', (request, response) => {
	DataBase.findById(request.params.id)
		.then(data => {
			if (data) {
				response.status(200).json(data);
			} else {
				response.status(404).json({
					message: "Error Retrieving The Requested Data."
				});
			}
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				message: "Error Retrieving The Requested Data."
			});
		});
    
});

router.get('/:id/comments', (request, response) => {
	DataBase.findPostComments(request.params.id)
		.then(data => {
			if (data) {
				response.status(200).json(data);
			} else {
				response.status(404).json({
					message: "Error Retrieving The Requested Data."
				})
			}
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				message: "Error Retrieving The Requested Data."
			});
		});
});



router.post('/posts', (request, response) => {
	DataBase.insert(request.body)
		.then(data => {
			response.status(201).json(data);
		})
		.catch(error => {
			response.status(500).json(error);
		});
});

router.post('/:id/comments', (request, response) => {
	DataBase.insertComment(request.body)
		.then(data => {
			response.status(201).json(data);
		})
		.catch(error => {
			response.status(500).json(error);
		});
});



router.delete('/:id', (request, response) => {

	DataBase.remove(request.params.id)
		.then(count => {
			if (count > 0) {
				response.status(200).json({message: "The Requested Data Has Been Removed."});
			} else {
				response.status(404).json({
					message: "Error Retrieving The Requested Data."
				});
			}
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				message: "Error Retrieving The Requested Data."
			});
		});

});



router.put('/:id', (request, response) => {
	const changes = request.body;

	DataBase.update(request.params.id, changes)
		.then(data => {
			if (data) {
				response.status(200).json(data);
			} else {
				response.status(404).json({
					message: "Error Retrieving The Requested Data."
				});
			}
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				message: "Error Retrieving The Requested Data."
			});
		});
    
});


module.exports = router;