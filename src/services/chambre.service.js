const chambreRepo = require('../repositories/chambre.repo');
const { HttpError } = require('../utils/httpError');

async function trouverToutesChambres(filtres = {}) {
  return chambreRepo.trouverToutesChambres(filtres);
}

async function trouverChambreParId(id) {
  const chambre = await chambreRepo.trouverChambreParId(id);
  if (!chambre) {
    throw new HttpError(404, `Chambre avec l'id "${id}" introuvable`);
  }
  return chambre;
}

async function creerChambre(donnees) {
  // Vérifier l'unicité du numéro
  const existant = await chambreRepo.trouverChambreParNumero(donnees.numero);
  if (existant) {
    throw new HttpError(409, `Une chambre avec le numéro "${donnees.numero}" existe déjà`);
  }

  return chambreRepo.creer(donnees);
}

async function mettreAJourChambre(id, donnees) {
  await trouverChambreParId(id);

  // Vérifier l'unicité du numéro si modifié
  if (donnees.numero) {
    const existant = await chambreRepo.trouverChambreParNumero(donnees.numero);
    if (existant && existant.id !== parseInt(id)) {
      throw new HttpError(409, `Une chambre avec le numéro "${donnees.numero}" existe déjà`);
    }
  }

  return chambreRepo.mettreAJour(id, donnees);
}

async function supprimerChambre(id) {
  await trouverChambreParId(id);

  // Interdire suppression si réservations CONFIRMEE existent
  const aDesReservations = await chambreRepo.chambreADesReservationsConfirmees(id);
  if (aDesReservations) {
    throw new HttpError(409, 'Impossible de supprimer : la chambre a des réservations confirmées en cours');
  }

  return chambreRepo.supprimer(id);
}

module.exports = {
  trouverToutesChambres,
  trouverChambreParId,
  creerChambre,
  mettreAJourChambre,
  supprimerChambre
};
