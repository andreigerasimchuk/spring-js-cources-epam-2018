const ItemListService = require('../core/sevices/ItemListService');
const TodoNotFoundError = require('../errors/TodoNotFoundError');
const DAO = require('../dao');

const listService = new ItemListService(DAO);

const like = (req, res, next) => {
  const { _id } = req.params;
  
  listService
    .likeItem(_id)
    .then(result => {
      if (result.item === null) {
        next(new TodoNotFoundError(_id));
      } else {
        res.status(200).json({ item: result.item });
      }
    })
    .catch(err => {
      next(new Error(err));
    });
}

module.exports = like;