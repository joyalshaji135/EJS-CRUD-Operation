const express = require('express');
const router = express.Router();
const concertController = require('../controllers/concertController');

// GET all concerts
router.get('/', concertController.getAllConcerts);

// GET form for new concert
router.get('/new', concertController.getNewConcertForm);

// POST create new concert
router.post('/', concertController.createConcert);

// GET single concert
router.get('/:id', concertController.getConcert);

// GET form to edit concert
router.get('/:id/edit', concertController.getEditConcertForm);

// PUT update concert
router.put('/:id', concertController.updateConcert);

// DELETE concert
router.delete('/:id', concertController.deleteConcert);

module.exports = router;
