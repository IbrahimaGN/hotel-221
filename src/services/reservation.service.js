const reservationRepo = require('../repositories/reservation.repo');
const clientRepo = require('../repositories/client.repo');
const chambreRepo = require('../repositories/chambre.repo');
const { HttpError } = require('../utils/httpError');

async function trouverToutesReservations(filtres = {}) {
  return reservationRepo.trouverToutesReservations(filtres);
}

async function trouverReservationParId(id) {
  const reservation = await reservationRepo.trouverReservationParId(id);
  if (!reservation) {
    throw new HttpError(404, `Réservation avec l'id "${id}" introuvable`);
  }
  return reservation;
}

async function creerReservation(donnees) {
  const { clientId, chambreId, dateArrivee, dateDepart } = donnees;

  // Vérifier l'existence du client
  const client = await clientRepo.trouverParId(clientId);
  if (!client) {
    throw new HttpError(404, `Client avec l'id "${clientId}" introuvable`);
  }

  // Vérifier l'existence de la chambre
  const chambre = await chambreRepo.trouverParId(chambreId);
  if (!chambre) {
    throw new HttpError(404, `Chambre avec l'id "${chambreId}" introuvable`);
  }

  const arrivee = new Date(dateArrivee);
  const depart = new Date(dateDepart);
  const aujourdhui = new Date();
  aujourdhui.setHours(0, 0, 0, 0);

  // Valider dateArrivee >= aujourd'hui
  if (arrivee < aujourdhui) {
    throw new HttpError(400, "La date d'arrivée doit être égale ou supérieure à aujourd'hui");
  }

  // Valider dateDepart > dateArrivee
  if (depart <= arrivee) {
    throw new HttpError(400, "La date de départ doit être supérieure à la date d'arrivée");
  }

  // Vérifier les chevauchements de réservations CONFIRMEE
  const chevauchement = await chambreRepo.verifierChevauchement(chambreId, arrivee, depart);
  if (chevauchement) {
    throw new HttpError(409, 'La chambre est déjà réservée (CONFIRMEE) pour ces dates');
  }

  // Calculer le montant : nombre de nuits × prix par nuit
  const msParJour = 1000 * 60 * 60 * 24;
  const nombreNuits = Math.round((depart - arrivee) / msParJour);
  const montant = nombreNuits * chambre.prixParNuit;

  return reservationRepo.creer({
    clientId: parseInt(clientId),
    chambreId: parseInt(chambreId),
    dateArrivee: arrivee,
    dateDepart: depart,
    montant,
    statut: 'CONFIRMEE'
  });
}

async function mettreAJourReservation(id, donnees) {
  await trouverReservationParId(id);
  return reservationRepo.mettreAJour(id, donnees);
}

async function supprimerReservation(id) {
  await trouverReservationParId(id);

  // Interdire suppression si des services sont liés
  const aDesServices = await reservationRepo.reservationADesServices(id);
  if (aDesServices) {
    throw new HttpError(409, 'Impossible de supprimer : la réservation a des services associés');
  }

  return reservationRepo.supprimer(id);
}

module.exports = {
  trouverToutesReservations,
  trouverReservationParId,
  creerReservation,
  mettreAJourReservation,
  supprimerReservation
};
