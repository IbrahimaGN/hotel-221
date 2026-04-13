const baseRepo = require('./base.repo');
const prisma = require('../config/db');
const { convertirId } = require('../utils/id.utils');

const reservationBase = baseRepo('reservation');

// Récupérer toutes les réservations avec filtres optionnels
async function trouverToutesReservations(filtres = {}) {
  const where = {};

  if (filtres.statut) where.statut = filtres.statut;
  if (filtres.clientId) where.clientId = convertirId(filtres.clientId, 'ID du client');
  if (filtres.chambreId) where.chambreId = convertirId(filtres.chambreId, 'ID de la chambre');

  return prisma.reservation.findMany({
    where,
    include: {
      client: { select: { id: true, prenom: true, nom: true, email: true } },
      chambre: { select: { id: true, numero: true, type: true, prixParNuit: true } },
      _count: { select: { services: true } }
    },
    orderBy: { dateArrivee: 'desc' }
  });
}

// Récupérer une réservation par son ID avec détails complets
async function trouverReservationParId(id) {
  return reservationBase.trouverParId(id, {
    include: {
      client: { select: { id: true, prenom: true, nom: true, email: true, telephone: true } },
      chambre: { select: { id: true, numero: true, type: true, prixParNuit: true, statut: true } },
      services: { orderBy: { date: 'desc' } }
    }
  });
}

// Vérifier si une réservation a des services liés
async function reservationADesServices(id) {
  const reservationId = convertirId(id, 'ID de la réservation');
  const count = await prisma.service.count({ where: { reservationId } });
  return count > 0;
}

module.exports = {
  ...reservationBase,
  trouverToutesReservations,
  trouverReservationParId,
  reservationADesServices
};
