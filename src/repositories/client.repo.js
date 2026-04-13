const baseRepo = require('./base.repo');
const prisma = require('../config/db');
const { convertirId } = require('../utils/id.utils');

const clientBase = baseRepo('client');

async function trouverTousClients(filtres = {}) {
  const where = {};

  if (filtres.recherche) {
    where.OR = [
      { nom: { contains: filtres.recherche, mode: 'insensitive' } },
      { prenom: { contains: filtres.recherche, mode: 'insensitive' } },
      { email: { contains: filtres.recherche, mode: 'insensitive' } }
    ];
  }

  return prisma.client.findMany({
    where,
    include: {
      _count: { select: { reservations: true } }
    },
    orderBy: { nom: 'asc' }
  });
}

async function trouverClientParId(id) {
  return clientBase.trouverParId(id, {
    include: {
      reservations: {
        include: {
          chambre: { select: { id: true, numero: true, type: true } }
        },
        orderBy: { dateArrivee: 'desc' }
      }
    }
  });
}

async function trouverClientParEmail(email) {
  return prisma.client.findUnique({ where: { email } });
}

async function trouverClientParTelephone(telephone) {
  return prisma.client.findUnique({ where: { telephone } });
}

async function trouverClientParPieceIdentite(pieceIdentite) {
  return prisma.client.findUnique({ where: { pieceIdentite } });
}

async function clientADesReservations(id) {
  const clientId = convertirId(id, 'ID du client');
  const count = await prisma.reservation.count({ where: { clientId } });
  return count > 0;
}

module.exports = {
  ...clientBase,
  trouverTousClients,
  trouverClientParId,
  trouverClientParEmail,
  trouverClientParTelephone,
  trouverClientParPieceIdentite,
  clientADesReservations
};