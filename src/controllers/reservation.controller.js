const reservationService = require('../services/reservation.service');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');

// Récupérer toutes les réservations
const getReservations = asyncHandler(async (req, res) => {
  const { statut, clientId, chambreId } = req.query;
  const filtres = {};
  if (statut) filtres.statut = statut;
  if (clientId) filtres.clientId = clientId;
  if (chambreId) filtres.chambreId = chambreId;

  const reservations = await reservationService.trouverToutesReservations(filtres);
  sendResponse(res, 200, 'Réservations récupérées avec succès', reservations);
});

// Récupérer une réservation par son ID
const getReservationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reservation = await reservationService.trouverReservationParId(id);
  sendResponse(res, 200, 'Réservation récupérée avec succès', reservation);
});

// Créer une réservation
const createReservation = asyncHandler(async (req, res) => {
  const { clientId, chambreId, dateArrivee, dateDepart } = req.body;
  const reservation = await reservationService.creerReservation({ clientId, chambreId, dateArrivee, dateDepart });
  sendResponse(res, 201, 'Réservation créée avec succès', reservation);
});

// Mettre à jour une réservation (statut)
const updateReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;
  const reservation = await reservationService.mettreAJourReservation(id, { statut });
  sendResponse(res, 200, 'Réservation mise à jour avec succès', reservation);
});

// Supprimer une réservation
const deleteReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await reservationService.supprimerReservation(id);
  sendResponse(res, 200, 'Réservation supprimée avec succès');
});

module.exports = { getReservations, getReservationById, createReservation, updateReservation, deleteReservation };
