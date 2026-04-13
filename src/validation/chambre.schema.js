const Joi = require('joi');

const schemaCreerChambre = Joi.object({
  numero: Joi.string().required().messages({
    'any.required': 'Le numéro de chambre est obligatoire',
    'string.empty': 'Le numéro de chambre ne peut pas être vide'
  }),
  type: Joi.string().valid('SIMPLE', 'DOUBLE', 'SUITE').required().messages({
    'any.required': 'Le type de chambre est obligatoire',
    'any.only': 'Le type doit être SIMPLE, DOUBLE ou SUITE'
  }),
  prixParNuit: Joi.number().positive().required().messages({
    'any.required': 'Le prix par nuit est obligatoire',
    'number.base': 'Le prix par nuit doit être un nombre',
    'number.positive': 'Le prix par nuit doit être supérieur à 0'
  }),
  statut: Joi.string().valid('LIBRE', 'OCCUPEE', 'MAINTENANCE').optional().messages({
    'any.only': 'Le statut doit être LIBRE, OCCUPEE ou MAINTENANCE'
  })
});

const schemaMettreAJourChambre = Joi.object({
  numero: Joi.string(),
  type: Joi.string().valid('SIMPLE', 'DOUBLE', 'SUITE').messages({
    'any.only': 'Le type doit être SIMPLE, DOUBLE ou SUITE'
  }),
  prixParNuit: Joi.number().positive().messages({
    'number.base': 'Le prix par nuit doit être un nombre',
    'number.positive': 'Le prix par nuit doit être supérieur à 0'
  }),
  statut: Joi.string().valid('LIBRE', 'OCCUPEE', 'MAINTENANCE').messages({
    'any.only': 'Le statut doit être LIBRE, OCCUPEE ou MAINTENANCE'
  })
}).min(1);

module.exports = { schemaCreerChambre, schemaMettreAJourChambre };
