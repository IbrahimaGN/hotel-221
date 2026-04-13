const clientService = require('../services/client.service');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');

// Récupérer tous les clients
const getClients = asyncHandler(async (req, res) => {
  const { recherche } = req.query;
  const filtres = {};
  if (recherche) filtres.recherche = recherche;

  const clients = await clientService.trouverTousClients(filtres);
  sendResponse(res, 200, 'Clients récupérés avec succès', clients);
});

// Récupérer un client par son ID
const getClientById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const client = await clientService.trouverClientParId(id);
  sendResponse(res, 200, 'Client récupéré avec succès', client);
});

// Créer un client
const createClient = asyncHandler(async (req, res) => {
  const { prenom, nom, email, telephone, pieceIdentite } = req.body;
  const client = await clientService.creerClient({ prenom, nom, email, telephone, pieceIdentite });
  sendResponse(res, 201, 'Client créé avec succès', client);
});

// Mettre à jour un client
const updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { prenom, nom, email, telephone, pieceIdentite } = req.body;
  const client = await clientService.mettreAJourClient(id, { prenom, nom, email, telephone, pieceIdentite });
  sendResponse(res, 200, 'Client mis à jour avec succès', client);
});

// Supprimer un client
const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await clientService.supprimerClient(id);
  sendResponse(res, 200, 'Client supprimé avec succès');
});

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };
