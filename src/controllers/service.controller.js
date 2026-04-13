const serviceService = require('../services/service.service');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');

// Récupérer tous les services
const getServices = asyncHandler(async (req, res) => {
  const { reservationId } = req.query;
  const filtres = {};
  if (reservationId) filtres.reservationId = reservationId;

  const services = await serviceService.trouverTousServices(filtres);
  sendResponse(res, 200, 'Services récupérés avec succès', services);
});

// Récupérer un service par son ID
const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await serviceService.trouverServiceParId(id);
  sendResponse(res, 200, 'Service récupéré avec succès', service);
});

// Ajouter un service
const createService = asyncHandler(async (req, res) => {
  const { reservationId, libelle, prix, date } = req.body;
  const service = await serviceService.ajouterService({ reservationId, libelle, prix, date });
  sendResponse(res, 201, 'Service ajouté avec succès', service);
});

// Supprimer un service
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await serviceService.supprimerService(id);
  sendResponse(res, 200, 'Service supprimé avec succès');
});

module.exports = { getServices, getServiceById, createService, deleteService };
