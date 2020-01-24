const express = require('express');
const posts = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    posts.find()
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'post not found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the hub',
            });
        });
});

router.get('/:id', (req, res) => {
    posts.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).send(post);
        } else {
            res.status(404).send('Cheif the user aint here  ¯\_(ツ)_/¯ ');
            }
        })

    .catch(err => {
        res.status(500).send('Sorry Cheif this aint it :/');
    })
});

 router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await posts.findCommentById(req.params.id);

        if (comments.length > 0) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({ comments: 'No messages for this hub' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            comments: 'Error retrieving the messages for this hub',
        });
    }
});

router.post('/', (req, res) => {
    posts.insert(req.body)
    .then(post =>{
        res.status(201).json(post);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error adding the post',
        });
    })
});

router.post('/:id/comments', async (req, res) => {
    const commentContent = { ...req.body, post_id: req.params.id };

    try {
        const comment = await posts.insertComment(commentContent);
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The hub could not be found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error updating the hub',
            });
        });
});

router.delete('/:id', (req, res) => {
    posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The post has been nuked' });
            } else {
                res.status(404).json({ message: 'The post could not be found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error removing the hub',
            });
        });
});

module.exports = router;