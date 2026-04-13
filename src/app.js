require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Configuration
const env = require('./config/env');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

// Routes
const chambreRoutes = require('./routes/chambre.routes');
const clientRoutes = require('./routes/client.routes');
const reservationRoutes = require('./routes/reservation.routes');
const serviceRoutes = require('./routes/service.routes');

// Initialisation de l'application Express
const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: 'HOTEL 221 - API Docs',
}));

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    succes: true,
    message: 'HOTEL 221 API — Opérationnelle',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: env.NODE_ENV,
  });
});

// Routes de l'API
app.use('/api/chambres', chambreRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/services', serviceRoutes);

// Gestion des erreurs
app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur
app.listen(env.PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║         🏨 HOTEL 221 — API Hôtelière v1.0.0      ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  ✅ Serveur démarré sur le port : ${env.PORT}            ║`);
  console.log(`║  🌐 URL    : http://localhost:${env.PORT}                ║`);
  console.log(`║  📚 Docs   : http://localhost:${env.PORT}/api-docs       ║`);
  console.log(`║  ❤️  Health : http://localhost:${env.PORT}/health         ║`);
  console.log('╚══════════════════════════════════════════════════╝\n');
});

module.exports = app;
