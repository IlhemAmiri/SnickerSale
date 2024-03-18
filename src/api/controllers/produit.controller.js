const Produit = require('../models/produit.model');

// Créer un nouveau produit
exports.create = async (req, res) => {
    try {
        const {
            nom,
            categorie,
            prix,
            quantite,
            image,
            fournisseur,
            description,
            marque,
            couleur,
            poids,
            dimensions
        } = req.body;

        const produit = new Produit({
            nom,
            categorie,
            prix,
            quantite,
            image,
            fournisseur,
            description,
            marque,
            couleur,
            poids,
            dimensions
        });

        const nouveauProduit = await produit.save();
        res.status(201).json(nouveauProduit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création du produit" });
    }
};


// Récupérer tous les produits
exports.findAll = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des produits" });
    }
};

// Récupérer un produit par son ID
exports.findOne = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(produit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du produit" });
    }
};

// Mettre à jour un produit
exports.update = async (req, res) => {
    try {
        const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produit) {
            return res.status(404).json({ message: `Impossible de mettre à jour le produit avec l'ID ${req.params.id}` });
        }
        res.status(200).json(produit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du produit" });
    }
};

// Supprimer un produit
exports.delete = async (req, res) => {
    try {
        const produit = await Produit.findByIdAndDelete(req.params.id);
        if (!produit) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du produit" });
    }
};

// Rechercher des produits par nom, catégorie et prix

exports.searchByRange = async (req, res) => {
    try {
        const { nom, categorie, minPrice, maxPrice } = req.query;
        let query = {};

        if (nom) {
            query.nom = { $regex: nom, $options: 'i' };
        }

        if (categorie) {
            query.categorie = categorie;
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            query.prix = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice !== undefined) {
            query.prix = { $gte: minPrice };
        } else if (maxPrice !== undefined) {
            query.prix = { $lte: maxPrice };
        }

        const produits = await Produit.find(query);
        res.status(200).json(produits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la recherche des produits" });
    }
};
