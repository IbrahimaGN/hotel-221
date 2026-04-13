const serviceRepo = require('../repositories/service.repo');
const reservationRepo = require('../repositories/reservation.repo');
const { HttpError } = require('../utils/httpError');

async function trouverTousServices(filtres = {}) {
  return serviceRepo.trouverTousServices(filtres);
}

async function trouverServiceParId(id) {
  const service = await serviceRepo.trouverServiceParId(id);
  if (!service) {
    throw new HttpError(404, `Service avec l'id "${id}" introuvable`);
  }
  return service;
}

async function ajouterService(donnees) {
  const { reservationId, libelle, prix, date } = donnees;

  // Vérifier l'existence de la réservation
  const reservation = await reservationRepo.trouverParId(reservationId);
  if (!reservation) {
    throw new HttpError(404, `Réservation avec l'id "${reservationId}" introuvable`);
  }

  // Vérifier que la réservation est CONFIRMEE
  if (reservation.statut !== 'CONFIRMEE') {
    throw new HttpError(400, `Impossible d'ajouter un service : la réservation doit être CONFIRMEE (statut actuel : ${reservation.statut})`);
  }

  return serviceRepo.creer({
    libelle,
    prix,
    date: new Date(date),
    reservationId: parseInt(reservationId)
  });
}

async function supprimerService(id) {
  await trouverServiceParId(id);
  return serviceRepo.supprimer(id);
}

module.exports = {
  trouverTousServices,
  trouverServiceParId,
  ajouterService,
  supprimerService
};
