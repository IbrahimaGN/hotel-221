const Joi = require('joi');

const schemaCreerClient = Joi.object({
  prenom: Joi.string().min(2).max(50).required().messages({
    'any.required': 'Le prénom est obligatoire',
    'string.empty': 'Le prénom ne peut pas être vide',
    'string.min': 'Le prénom doit contenir au moins 2 caractères'
  }),
  nom: Joi.string().min(2).max(50).required().messages({
    'any.required': 'Le nom est obligatoire',
    'string.empty': 'Le nom ne peut pas être vide',
    'string.min': 'Le nom doit contenir au moins 2 caractères'
  }),
  email: Joi.string().email().required().messages({
    'any.required': "L'email est obligatoire",
    'string.email': "L'email doit être valide"
  }),
  telephone: Joi.string()
    .pattern(/^\+221(77|78|76|70|75)\d{7}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Le téléphone doit être au format +221XXXXXXXXX (77, 78, 76, 70 ou 75)'
    }),
  pieceIdentite: Joi.string().required().messages({
    'any.required': "Le numéro de pièce d'identité est obligatoire",
    'string.empty': "Le numéro de pièce d'identité ne peut pas être vide"
  })
});

const schemaMettreAJourClient = Joi.object({
  prenom: Joi.string().min(2).max(50),
  nom: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  telephone: Joi.string()
    .pattern(/^\+221(77|78|76|70|75)\d{7}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Le téléphone doit être au format +221XXXXXXXXX (77, 78, 76, 70 ou 75)'
    }),
  pieceIdentite: Joi.string()
}).min(1);

module.exports = { schemaCreerClient, schemaMettreAJourClient };