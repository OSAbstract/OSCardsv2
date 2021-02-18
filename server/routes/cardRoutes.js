/*
 * This router handles routes to localhost:3000/card
 */

const express = require('express');
const cardController = require('../controllers/cardControllers');

const cardRouter = express.Router();

// directs post requests made to the root endpoint of /card to the cardController
cardRouter.post('/', cardController.addCard, (req, res) => {
  res.status(200).send(res.locals.newCard);
});

// directs delete requests made to the /:uniqueId endpoint of /card to the cardController
cardRouter.delete('/:uniqueId', cardController.deleteCard, (req, res) => {
  res.status(200).send('card deleted');
});

cardRouter.patch('/:uniqueID', cardController.updateCard, (req, res) => {
  res.status(200).send(res.locals.updatedCard);
});

module.exports = cardRouter;
