const clientRepo = require('../repositories/client.repo');
const { HttpError } = require('../utils/httpError');

async function trouverTousClients(filtres = {}) {
  return clientRepo.trouverTousClients(filtres);
}

async function trouverClientParId(id) {
  const client = await clientRepo.trouverClientParId(id);
  if (!client) {
    throw new HttpError(404, `Client avec l'id "${id}" introuvable`);
  }
  return client;
}

async function creerClient(donnees) {
  // Vérifier l'unicité de l'email
  const existantEmail = await clientRepo.trouverClientParEmail(donnees.email);
  if (existantEmail) {
    throw new HttpError(409, `Un client avec l'email "${donnees.email}" existe déjà`);
  }

  // Vérifier l'unicité du téléphone
  if (donnees.telephone) {
    const existantTel = await clientRepo.trouverClientParTelephone(donnees.telephone);
    if (existantTel) {
      throw new HttpError(409, `Un client avec le téléphone "${donnees.telephone}" existe déjà`);
    }
  }

  // Vérifier l'unicité de la pièce d'identité
  const existantPiece = await clientRepo.trouverClientParPieceIdentite(donnees.pieceIdentite);
  if (existantPiece) {
    throw new HttpError(409, `Un client avec la pièce d'identité "${donnees.pieceIdentite}" existe déjà`);
  }

  return clientRepo.creer(donnees);
}

async function mettreAJourClient(id, donnees) {
  const client = await trouverClientParId(id);

  if (donnees.email && donnees.email !== client.email) {
    const existant = await clientRepo.trouverClientParEmail(donnees.email);
    if (existant) {
      throw new HttpError(409, `Un client avec l'email "${donnees.email}" existe déjà`);
    }
  }

  if (donnees.telephone && donnees.telephone !== client.telephone) {
    const existant = await clientRepo.trouverClientParTelephone(donnees.telephone);
    if (existant) {
      throw new HttpError(409, `Un client avec le téléphone "${donnees.telephone}" existe déjà`);
    }
  }

  if (donnees.pieceIdentite && donnees.pieceIdentite !== client.pieceIdentite) {
    const existant = await clientRepo.trouverClientParPieceIdentite(donnees.pieceIdentite);
    if (existant) {
      throw new HttpError(409, `Un client avec la pièce d'identité "${donnees.pieceIdentite}" existe déjà`);
    }
  }

  return clientRepo.mettreAJour(id, donnees);
}

async function supprimerClient(id) {
  await trouverClientParId(id);

  const aDesReservations = await clientRepo.clientADesReservations(id);
  if (aDesReservations) {
    throw new HttpError(409, 'Impossible de supprimer : le client a des réservations associées');
  }

  return clientRepo.supprimer(id);
}

module.exports = {
  trouverTousClients,
  trouverClientParId,
  creerClient,
  mettreAJourClient,
  supprimerClient
};