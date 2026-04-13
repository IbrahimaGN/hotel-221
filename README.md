# 🏨 HOTEL 221 — API Hôtelière

API REST pour la gestion des chambres, clients, réservations et services de l'hôtel HOTEL 221.

---

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env .env
# Remplir DATABASE_URL dans .env

# 3. Générer le client Prisma et migrer la base de données
npm run db:generate
npm run db:migrate

# 4. Démarrer en mode développement
npm run dev
```

---

## 📁 Structure du projet

```
src/
├── app.js
├── config/
│   ├── db.js
│   └── env.js
├── controllers/
│   ├── chambre.controller.js
│   ├── client.controller.js
│   ├── reservation.controller.js
│   └── service.controller.js
├── middlewares/
│   ├── errorHandler.js
│   ├── notFound.js
│   └── validate.js
├── repositories/
│   ├── base.repo.js
│   ├── chambre.repo.js
│   ├── client.repo.js
│   ├── reservation.repo.js
│   └── service.repo.js
├── routes/
│   ├── chambre.routes.js
│   ├── client.routes.js
│   ├── reservation.routes.js
│   └── service.routes.js
├── services/
│   ├── chambre.service.js
│   ├── client.service.js
│   ├── reservation.service.js
│   └── service.service.js
├── utils/
│   ├── asyncHandler.js
│   ├── httpError.js
│   ├── id.utils.js
│   ├── response.js
│   └── service.helpers.js
└── validation/
    ├── chambre.schema.js
    ├── client.schema.js
    ├── reservation.schema.js
    └── service.schema.js
```

---

## 🔗 Endpoints — Livrable 1

### Chambres `/api/chambres`
| Méthode | Route | Description |
|--------|-------|-------------|
| GET | `/api/chambres` | Lister toutes les chambres |
| GET | `/api/chambres/:id` | Détail d'une chambre |
| POST | `/api/chambres` | Créer une chambre |
| PUT | `/api/chambres/:id` | Modifier une chambre |
| DELETE | `/api/chambres/:id` | Supprimer une chambre |

### Clients `/api/clients`
| Méthode | Route | Description |
|--------|-------|-------------|
| GET | `/api/clients` | Lister tous les clients |
| GET | `/api/clients/:id` | Détail d'un client |
| POST | `/api/clients` | Créer un client |
| PUT | `/api/clients/:id` | Modifier un client |
| DELETE | `/api/clients/:id` | Supprimer un client |

### Réservations `/api/reservations`
| Méthode | Route | Description |
|--------|-------|-------------|
| GET | `/api/reservations` | Lister toutes les réservations |
| GET | `/api/reservations/:id` | Détail d'une réservation |
| POST | `/api/reservations` | Créer une réservation |
| PUT | `/api/reservations/:id` | Modifier le statut |
| DELETE | `/api/reservations/:id` | Supprimer une réservation |

### Services `/api/services`
| Méthode | Route | Description |
|--------|-------|-------------|
| GET | `/api/services` | Lister tous les services |
| GET | `/api/services/:id` | Détail d'un service |
| POST | `/api/services` | Ajouter un service |
| DELETE | `/api/services/:id` | Supprimer un service |

---

## ✅ Règles métier implémentées (Livrable 1)

- **Chambre** : numéro unique, type contrôlé (SIMPLE/DOUBLE/SUITE), prix > 0
- **Client** : email unique, pièce d'identité unique, prénom/nom min 2 caractères
- **Réservation** : dateArrivée ≥ aujourd'hui, dateDepart > dateArrivée, pas de chevauchement CONFIRMEE, montant calculé automatiquement
- **Service** : réservation doit exister et être CONFIRMEE, prix ≥ 0, libellé obligatoire
- **Suppressions protégées** : chambre avec réservations CONFIRMEE, client avec réservations, réservation avec services
