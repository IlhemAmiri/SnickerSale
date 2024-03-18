const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produitSchema = new Schema({
    nom: { type: String, required: true },
    categorie: { type: String, required: true },
    prix: { type: Number, required: true },
    quantite: { type: Number, required: true },
    image: { type: String, required: true },
    fournisseur: { type: Schema.Types.ObjectId, ref: 'Fournisseur', required: true },
    description: { type: String, required: false },
    marque: { type: String, required: false },
    couleur: { type: String, required: false },
    poids: { type: String, required: false },
    dimensions: {
        longueur: { type: String, required: false },
        largeur: { type: String, required: false },
        hauteur: { type: String, required: false }
    },
    dateCreation: {type: Date,default: Date.now},
    dateMiseAJour: {type: Date,default: Date.now}
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
