const Joi = require('joi');

const schemaCreerService = Joi.object({
  reservationId: Joi.number().integer().required().messages({
    'any.required': 'Le reservationId est obligatoire',
    'number.base': 'Le reservationId doit être un nombre entier'
  }),
  libelle: Joi.string().required().messages({
    'any.required': 'Le libellé est obligatoire',
    'string.empty': 'Le libellé ne peut pas être vide'
  }),
  prix: Joi.number().min(0).required().messages({
    'any.required': 'Le prix est obligatoire',
    'number.base': 'Le prix doit être un nombre',
    'number.min': 'Le prix doit être supérieur ou égal à 0'
  }),
  date: Joi.date().iso().required().messages({
    'any.required': 'La date du service est obligatoire',
    'date.base': 'La date doit être une date valide'
  })
});

module.exports = { schemaCreerService };
