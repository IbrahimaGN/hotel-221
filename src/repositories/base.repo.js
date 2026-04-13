const prisma = require('../config/db');
const { convertirId, traiterIdsWhere } = require('../utils/id.utils');

// Repository générique réutilisable pour n'importe quel modèle Prisma
const baseRepo = (modele) => {
  const db = prisma[modele];

  return {
    // Trouver tous les enregistrements avec options
    async trouverTout(options = {}) {
      if (options.where) {
        options.where = traiterIdsWhere(options.where);
      }
      return db.findMany(options);
    },

    // Trouver un enregistrement par son ID
    async trouverParId(id, options = {}) {
      const idNumber = convertirId(id, modele);
      return db.findUnique({
        where: { id: idNumber },
        ...options
      });
    },

    // Trouver un enregistrement par des critères uniques
    async trouverUn(where, options = {}) {
      const whereTraite = traiterIdsWhere(where);
      return db.findFirst({
        where: whereTraite,
        ...options
      });
    },

    // Créer un nouvel enregistrement
    async creer(donnees) {
      return db.create({ data: donnees });
    },

    // Mettre à jour un enregistrement par son ID
    async mettreAJour(id, donnees) {
      const idNumber = convertirId(id, modele);
      return db.update({
        where: { id: idNumber },
        data: donnees
      });
    },

    // Supprimer un enregistrement par son ID
    async supprimer(id) {
      const idNumber = convertirId(id, modele);
      return db.delete({ where: { id: idNumber } });
    },

    // Compter les enregistrements selon des critères
    async compter(where = {}) {
      const whereTraite = traiterIdsWhere(where);
      return db.count({ where: whereTraite });
    }
  };
};

module.exports = baseRepo;
