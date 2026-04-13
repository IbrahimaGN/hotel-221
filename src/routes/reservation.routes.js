const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const valider = require('../middlewares/validate');
const { schemaCreerReservation, schemaMettreAJourReservation } = require('../validation/reservation.schema');

router.get('/', reservationController.getReservations);
router.get('/:id', reservationController.getReservationById);
router.post('/', valider(schemaCreerReservation), reservationController.createReservation);
router.put('/:id', valider(schemaMettreAJourReservation), reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
