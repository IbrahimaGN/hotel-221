const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const valider = require('../middlewares/validate');
const { schemaCreerService } = require('../validation/service.schema');

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', valider(schemaCreerService), serviceController.createService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
