const baseRepo = require('./base.repo');
const prisma = require('../config/db');
const { convertirId } = require('../utils/id.utils');

const serviceBase = baseRepo('service');

// Récupérer tous les services avec filtres optionnels
async function trouverTousServices(filtres = {}) {
  const where = {};

  if (filtres.reservationId) {
    where.reservationId = convertirId(filtres.reservationId, 'ID de la réservation');
  }

  return prisma.service.findMany({
    where,
    include: {
      reservation: {
        select: {
          id: true,
          statut: true,
          client: { select: { id: true, prenom: true, nom: true } },
          chambre: { select: { id: true, numero: true } }
        }
      }
    },
    orderBy: { date: 'desc' }
  });
}

// Récupérer un service par son ID
async function trouverServiceParId(id) {
  return serviceBase.trouverParId(id, {
    include: {
      reservation: {
        include: {
          client: { select: { id: true, prenom: true, nom: true } },
          chambre: { select: { id: true, numero: true, type: true } }
        }
      }
    }
  });
}

module.exports = {
  ...serviceBase,
  trouverTousServices,
  trouverServiceParId
};
