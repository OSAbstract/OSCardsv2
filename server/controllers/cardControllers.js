/*
 * This controller handles routes to localhost:3000/card
 * "Queries are Not Promises," from mongo docs: https://mongoosejs.com/docs/queries.html
 */

const CardModel = require('../models/card');

const cardController = {};

cardController.addCard = (req, res, next) => {
  // deconstruct properties required in mongoose/mongo model from request.body
  const { term, definition, deckId } = req.body;
  // instantiate a new card document via the mongoose model
  CardModel.create({ term, definition, deckId })
    .then((results) => {
      res.locals.newCard = results;
      return next();
    })
    .catch(() => next(new Error('Error in addCard create method')));
};

cardController.deleteCard = (req, res, next) => {
  // deconstruct property required in mongoose/mongo model's delete method from request.params
  // const { term } = req.params;
  const tempId = req.params.uniqueId
  CardModel.deleteOne({_id:`${tempId}`}, (err) => {
  return next(err)
  })
};

module.exports = cardController;




