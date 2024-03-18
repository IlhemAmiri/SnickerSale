const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FournisseurSchema = new Schema({
    matricule: { type: String, required: true, unique: true },
    nomFournisseur: { type: String, required: true },
    adresse: { type: String, required: true },
    produit: { type: String, required: true },
    quantite: { type: Number, required: true },
    numeroTelephone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    prix: { type: Number, required: true }
}, {
    timestamps: true
});

FournisseurSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Fournisseur', FournisseurSchema);
