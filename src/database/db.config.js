const config = require('../config/config');
const mongoose = require('mongoose');
const db = {};

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
db.mongoose = mongoose;
db.url = config.DB_URL;
db.users = require('../api/models/user.model')(mongoose);
db.fournisseurs = require('../api/models/fournisseur.model')(mongoose);
db.administrateurs = require('../api/models/admin.model')(mongoose);
db.tokens = require('../api/models/blacklistedToken.model')(mongoose);
db.produits = require('../api/models/produit.model')(mongoose);
module.exports = db;