// Convertit un ID en nombre entier et vérifie sa validité
function convertirId(id, nom = 'ID') {
  if (id === undefined || id === null) {
    throw new Error(`Le ${nom} est requis`);
  }
  if (typeof id === 'number') return id;

  const idNumber = parseInt(id);
  if (isNaN(idNumber)) {
    throw new Error(`Le ${nom} doit être un nombre valide (reçu: ${id})`);
  }
  return idNumber;
}

// Traite les objets "where" et convertit tous les champs d'ID en nombres entiers
function traiterIdsWhere(where) {
  if (!where || typeof where !== 'object') return where;

  const result = {};
  for (const [key, value] of Object.entries(where)) {
    if (key.toLowerCase().includes('id') && value !== undefined) {
      result[key] = convertirId(value, key);
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => traiterIdsWhere(item));
    } else if (value && typeof value === 'object') {
      result[key] = traiterIdsWhere(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

module.exports = { convertirId, traiterIdsWhere };
