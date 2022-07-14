const Card = require('../models/cards');
const NotFound = require('../utils/Errors/NotFound');
const Forbidden = require('../utils/Errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Не найдено'));
        return {};
      } if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        next(new Forbidden('Невозможно удалить карточку другого пользователя'));
        return {};
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then(() => {
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFound('Не найдено'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFound('Не найдено'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};
