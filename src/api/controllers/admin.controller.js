const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAdmin = async (req, res) => {
    try {
        const email = "ilhem.amiri2222@gmail.com";
        const motDePasse = "lahouma2022*";

        // Vérifie si un compte administrateur existe déjà
        const existingAdmin = await Admin.findOne({ email: email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Un compte administrateur existe déjà" });
            //console.log("Un compte administrateur avec cet email existe déjà.");
            //return;
        }

        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Crée un nouvel administrateur
        const admin = new Admin({
            email: email,
            motDePasse: hashedPassword
        });

        // Sauvegarde l'administrateur dans la base de données
        await admin.save();
        return res.status(201).json({ message: "Compte administrateur créé avec succès" });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la création du compte administrateur :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la création du compte administrateur" });
    }
};


exports.loginAdmin = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        // Vérifie si l'email de l'administrateur existe dans la base de données
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(401).json({ message: "L'email fourni n'existe pas" });
        }

        // Vérifie si le mot de passe correspond
        const validPassword = await bcrypt.compare(motDePasse, admin.motDePasse);
        if (!validPassword) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Création du token JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Envoi de la réponse avec le token
        //res.status(200).json({ token: token });
        res.status(200).json({ message: "Login réussi", token: token });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la connexion de l'administrateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la connexion de l'administrateur" });
    }
};
exports.logoutAdmin = async (req, res) => {
    try {
        // Implement logout functionality for admin
        res.status(200).send({ message: 'Déconnexion réussie pour l\'administrateur' });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la déconnexion de l'administrateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la déconnexion de l'administrateur" });
    }
};
