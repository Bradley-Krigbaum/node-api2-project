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
				error: "The posts information could not be retrieved."
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
					message: "The post with the specified ID does not exist."
				});
			}
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				error: "The post information could not be retrieved."
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
					message: "The post with the specified ID does not exist."
				})
			}
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				error: "The comments information could not be retrieved."
			});
		});
});



router.post('/posts', (request, response) => {
	DataBase.insert(request.body)
		.then(data => {
			if (data.title || data.contents) {
				response.status(201).json(data);
			} else if (!data.text) {
				response.status(400).json({errorMessage: "Please provide text for the comment."})
			} else {
				response.status(404).json({message: "The post with the specified ID does not exist."});
			};
			
		})
		.catch(error => {
			response.status(500).json({error: "There was an error while saving the post to the database"});
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
					message: "The post with the specified ID does not exist."
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
				response.status(400).json({
					errorMessage: "Please provide title and contents for the post."
				});
			}
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				error: "The post information could not be modified."
			});
		});
    
});


module.exports = router;