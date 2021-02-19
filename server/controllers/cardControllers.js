/*
 * This controller handles routes to localhost:3000/card
 * "Queries are Not Promises," from mongo docs: https://mongoosejs.com/docs/queries.html
 */

const CardModel = require('../models/card');
const ObjectID = require('mongodb').ObjectID;

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
  const tempId = req.params.uniqueId;
  CardModel.deleteOne({_id:`${tempId}`}, (err) => {
  return next(err);
  })
};

cardController.updateCard = (req, res, next) => {
  const newTerm = req.body.term;
  const newDefinition = req.body.definition;
  const newDeckId = req.body.deckId;
  const objID = req.params.uniqueID;
  const conditions = {"_id": objID};

  CardModel.findOneAndUpdate(
    conditions,
    { term: newTerm, definition: newDefinition, deckId: newDeckId }, 
    { omitUndefined: true, new: true },
    )
    .then((results) => {
      console.log('results: ', results);
      res.locals.updatedCard = results;
      return next();
    })
    .catch((err) => next(new Error('Error in updateCard method')));
};

module.exports = cardController;

