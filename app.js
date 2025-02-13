const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const qrRoutes = require('./routes/qr.routes');
const { syncDB } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', qrRoutes);

// Sincronizar la base de datos
syncDB();

// Configurar el puerto
const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
