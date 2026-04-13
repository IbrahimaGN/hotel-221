const baseRepo = require('./base.repo');
const prisma = require('../config/db');
const { convertirId } = require('../utils/id.utils');

const chambreBase = baseRepo('chambre');

// Récupérer toutes les chambres avec filtres optionnels
async function trouverToutesChambres(filtres = {}) {
  const where = {};

  if (filtres.type) where.type = filtres.type;
  if (filtres.statut) where.statut = filtres.statut;

  return prisma.chambre.findMany({
    where,
    include: {
      _count: { select: { reservations: true } }
    },
    orderBy: { numero: 'asc' }
  });
}

// Récupérer une chambre par son ID avec ses réservations
async function trouverChambreParId(id) {
  return chambreBase.trouverParId(id, {
    include: {
      reservations: {
        include: {
          client: { select: { id: true, prenom: true, nom: true, email: true } }
        },
        orderBy: { dateArrivee: 'desc' }
      }
    }
  });
}

// Récupérer une chambre par son numéro (unicité)
async function trouverChambreParNumero(numero) {
  return prisma.chambre.findUnique({ where: { numero } });
}

// Vérifier si une chambre a des réservations CONFIRMEE
async function chambreADesReservationsConfirmees(id) {
  const chambreId = convertirId(id, 'ID de la chambre');
  const count = await prisma.reservation.count({
    where: { chambreId, statut: 'CONFIRMEE' }
  });
  return count > 0;
}

// Vérifier les chevauchements de réservations pour une chambre
async function verifierChevauchement(chambreId, dateArrivee, dateDepart, excludeId = null) {
  const chambreIdNum = convertirId(chambreId, 'ID de la chambre');

  const where = {
    chambreId: chambreIdNum,
    statut: 'CONFIRMEE',
    AND: [
      { dateArrivee: { lt: dateDepart } },
      { dateDepart: { gt: dateArrivee } }
    ]
  };

  if (excludeId) {
    where.id = { not: convertirId(excludeId, 'ID réservation') };
  }

  const count = await prisma.reservation.count({ where });
  return count > 0;
}

module.exports = {
  ...chambreBase,
  trouverToutesChambres,
  trouverChambreParId,
  trouverChambreParNumero,
  chambreADesReservationsConfirmees,
  verifierChevauchement
};
