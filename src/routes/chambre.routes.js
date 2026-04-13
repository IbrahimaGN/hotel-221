const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambre.controller');
const valider = require('../middlewares/validate');
const { schemaCreerChambre, schemaMettreAJourChambre } = require('../validation/chambre.schema');

router.get('/', chambreController.getChambres);
router.get('/:id', chambreController.getChambreById);
router.post('/', valider(schemaCreerChambre), chambreController.createChambre);
router.put('/:id', valider(schemaMettreAJourChambre), chambreController.updateChambre);
router.delete('/:id', chambreController.deleteChambre);

module.exports = router;
