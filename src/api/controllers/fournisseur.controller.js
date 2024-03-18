const Fournisseur = require('../models/fournisseur.model');
const bcrypt = require('bcrypt');


exports.create = async (req, res) => {
    try {
        const { motDePasse, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        const fournisseur = await Fournisseur.create({ ...rest, motDePasse: hashedPassword });

        //res.status(201).json(fournisseur);
        res.status(200).send({
            message: 'Compte Fournisseur créé avec succès',
            //fournisseurId: newFournisseur._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création du fournisseur" });
    }
};

exports.findAll = async (req, res) => {
    try {
        const fournisseurs = await Fournisseur.find// JUST ma7abitch yaffichi il mot de passe ;// JUST ma7abitch yaffichi il mot de passe 
        res.status(200).json(fournisseurs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des fournisseurs" });
    }
};

exports.findOne = async (req, res) => {
    try {
        const fournisseur = await Fournisseur.findById(req.params.id, { motDePasse: 0 });// JUST ma7abitch yaffichi il mot de passe 
        if (!fournisseur) {
            return res.status(404).json({ message: 'Fournisseur non trouvé' });
        }
        res.status(200).json(fournisseur);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du fournisseur" });
    }
};

exports.update = async (req, res) => {
    try {
        const { nomFournisseur, adresse, produit, quantite, numeroTelephone, email, motDePasse, prix } = req.body;

        // Vérifier si toutes les informations nécessaires sont fournies
        if (!nomFournisseur || !adresse || !produit || !quantite || !numeroTelephone || !email || !motDePasse|| !prix ) {
            return res.status(400).json({ message: "Tous les champs sont requis, y compris le mot de passe" });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Mettre à jour le fournisseur avec le mot de passe haché
        const updatedFournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, {
            nomFournisseur: nomFournisseur,
            adresse: adresse,
            produit: produit,
            quantite: quantite,
            numeroTelephone: numeroTelephone,
            email: email,
            motDePasse: hashedPassword,
            prix: prix
            
        }, { new: true });

        // Vérifier si le fournisseur a été mis à jour avec succès
        if (!updatedFournisseur) {
            return res.status(404).json({ message: `Impossible de mettre à jour le fournisseur avec l'ID ${req.params.id}` });
        }

        // Envoyer la réponse avec le fournisseur mis à jour
        //res.status(200).json(updatedFournisseur);
        res.status(200).send({ message: "Fournisseur mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du fournisseur" });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedFournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
        if (!deletedFournisseur) {
            return res.status(404).json({ message: 'Fournisseur non trouvé' });
        }
        res.status(200).json({ message: 'Fournisseur supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du fournisseur" });
    }
};