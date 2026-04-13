const { creerErreur } = require('../utils/httpError');

const valider = (schema, source = 'body') => {
  return (req, res, next) => {
    const donnees = req[source];
    // abortEarly: false collecte toutes les erreurs, stripUnknown supprime les champs inconnus
    const { error, value } = schema.validate(donnees, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return next(creerErreur(400, 'Données invalides', details));
    }

    req[source] = value;
    next();
  };
};

module.exports = valider;
