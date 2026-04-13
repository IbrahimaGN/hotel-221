const Joi = require('joi');

const schemaCreerReservation = Joi.object({
  clientId: Joi.number().integer().required().messages({
    'any.required': 'Le clientId est obligatoire',
    'number.base': 'Le clientId doit être un nombre entier'
  }),
  chambreId: Joi.number().integer().required().messages({
    'any.required': 'Le chambreId est obligatoire',
    'number.base': 'Le chambreId doit être un nombre entier'
  }),
  dateArrivee: Joi.date().iso().required().messages({
    'any.required': "La date d'arrivée est obligatoire",
    'date.base': "La date d'arrivée doit être une date valide"
  }),
  dateDepart: Joi.date().iso().required().messages({
    'any.required': 'La date de départ est obligatoire',
    'date.base': 'La date de départ doit être une date valide'
  })
});

const schemaMettreAJourReservation = Joi.object({
  statut: Joi.string().valid('CONFIRMEE', 'ANNULEE', 'TERMINEE').messages({
    'any.only': 'Le statut doit être CONFIRMEE, ANNULEE ou TERMINEE'
  })
}).min(1);

module.exports = { schemaCreerReservation, schemaMettreAJourReservation };
