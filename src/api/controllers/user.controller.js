const bcrypt = require('bcrypt');
const slugify = require('slugify');
const db = require('../../database/db.config');
const User = db.users;

exports.create = async (req, res) => {
    const { nom, prenom, sexe, dateDeNaissance, adresse, numeroTelephone, email, motDePasse, image } = req.body;

    if (!nom || !prenom || !sexe || !dateDeNaissance || !adresse || !numeroTelephone || !email || !motDePasse) {
        return res.status(400).send({
            message: 'Tous les champs sont requis'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(motDePasse, 10); 
        const newUser = new User({
            nom: nom,
            prenom: prenom,
            sexe: sexe,
            dateDeNaissance: dateDeNaissance,
            adresse: adresse,
            numeroTelephone: numeroTelephone,
            email: email,
            motDePasse: hashedPassword, 
            image: image
        });

        await newUser.save();
        res.status(200).send({
            message: 'Compte utilisateur créé avec succès',
            //userId: newUser._id
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la création du compte utilisateur'
        });
    }
}

exports.findAll = (req, res) => {
    User.find({}, { motDePasse: 0 }).then((data) => { // na7it ilo mot de passe kn t7eb traj3o just na7ii ", { motDePasse: 0 }"
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la récupération des utilisateurs'
        });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ message: "L'identifiant est requis" });
        return;
    }

    User.findByIdAndDelete(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: "Utilisateur non trouvé" });
        } else {
            res.status(200).send({ message: "Utilisateur supprimé avec succès" });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ message: "L'identifiant est requis" });
        return;
    }

    User.findById(id, { motDePasse: 0 }).then((data) => { // na7it ilo mot de passe kn t7eb traj3o just na7ii ", { motDePasse: 0 }"
        if (!data) {
            res.status(404).send({ message: "Utilisateur non trouvé" });
        } else {
            res.send(data);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la récupération de l\'utilisateur'
        });
    });
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const { nom, prenom, sexe, dateDeNaissance, adresse, numeroTelephone, email, motDePasse, image } = req.body;

    if (!id || !nom || !prenom || !sexe || !dateDeNaissance || !adresse || !numeroTelephone || !email || !motDePasse) {
        res.status(400).send({ message: "Tous les champs sont requis, y compris le mot de passe" });
        return;
    }

    try {
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Mettre à jour l'utilisateur avec le mot de passe haché
        const updatedUser = await User.findByIdAndUpdate(id, {
            nom: nom,
            prenom: prenom,
            sexe: sexe,
            dateDeNaissance: dateDeNaissance,
            adresse: adresse,
            numeroTelephone: numeroTelephone,
            email: email,
            motDePasse: hashedPassword,
            image: image
        }, { useFindAndModify: false });

        if (!updatedUser) {
            res.status(404).send({ message: `Impossible de mettre à jour l'utilisateur avec l'identifiant ${id}` });
            return;
        }

        res.status(200).send({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Une erreur s'est produite lors de la mise à jour de l'utilisateur" });
    }
};


