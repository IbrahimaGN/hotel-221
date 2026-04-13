const chambreService = require('../services/chambre.service');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');

// Récupérer toutes les chambres
const getChambres = asyncHandler(async (req, res) => {
  const { type, statut } = req.query;
  const filtres = {};
  if (type) filtres.type = type;
  if (statut) filtres.statut = statut;

  const chambres = await chambreService.trouverToutesChambres(filtres);
  sendResponse(res, 200, 'Chambres récupérées avec succès', chambres);
});

// Récupérer une chambre par son ID
const getChambreById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const chambre = await chambreService.trouverChambreParId(id);
  sendResponse(res, 200, 'Chambre récupérée avec succès', chambre);
});

// Créer une chambre
const createChambre = asyncHandler(async (req, res) => {
  const { numero, type, prixParNuit, statut } = req.body;
  const chambre = await chambreService.creerChambre({ numero, type, prixParNuit, statut });
  sendResponse(res, 201, 'Chambre créée avec succès', chambre);
});

// Mettre à jour une chambre
const updateChambre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { numero, type, prixParNuit, statut } = req.body;
  const chambre = await chambreService.mettreAJourChambre(id, { numero, type, prixParNuit, statut });
  sendResponse(res, 200, 'Chambre mise à jour avec succès', chambre);
});

// Supprimer une chambre
const deleteChambre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await chambreService.supprimerChambre(id);
  sendResponse(res, 200, 'Chambre supprimée avec succès');
});

module.exports = { getChambres, getChambreById, createChambre, updateChambre, deleteChambre };
