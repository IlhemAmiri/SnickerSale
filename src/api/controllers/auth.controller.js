const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Fournisseur = require('../models/fournisseur.model');
const db = require('../../database/db.config');
const User = db.users;
const BlacklistedToken = require('../models/blacklistedToken.model');

const TOKEN_EXPIRATION = '1h';
const SUCCESS_MESSAGES = {
    login: 'Connexion réussie',
    logout: 'Déconnexion réussie',
};
const ERROR_MESSAGES = {
    notFound: 'Adresse e-mail incorrecte ou compte inexistant',
    incorrectPassword: 'Mot de passe incorrect',
    generic: 'Une erreur s\'est produite',
};

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

exports.login = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: ERROR_MESSAGES.notFound });
        }

        const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!passwordMatch) {
            return res.status(401).send({ message: ERROR_MESSAGES.incorrectPassword });
        }

        const token = generateToken(user._id, user.email);
        res.status(200).send({ token, message: SUCCESS_MESSAGES.login, nom: user.nom });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: ERROR_MESSAGES.generic });
    }
};

exports.loginFournisseur = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        const fournisseur = await Fournisseur.findOne({ email });
        if (!fournisseur) {
            return res.status(404).json({ message: ERROR_MESSAGES.notFound });
        }

        const passwordMatch = await bcrypt.compare(motDePasse, fournisseur.motDePasse);
        if (!passwordMatch) {
            return res.status(401).json({ message: ERROR_MESSAGES.incorrectPassword });
        }

        const token = generateToken(fournisseur._id, fournisseur.email);
        res.status(200).send({ token, message: SUCCESS_MESSAGES.login, nomFournisseur: fournisseur.nomFournisseur });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_MESSAGES.generic });
    }
};

exports.logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const blacklistedToken = new BlacklistedToken({ token });
            await blacklistedToken.save();
        }

        res.status(200).send({ message: SUCCESS_MESSAGES.logout });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_MESSAGES.generic });
    }
};
















// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Fournisseur = require('../models/fournisseur.model');
// const db = require('../../database/db.config');
// const User = db.users;



// exports.login = async (req, res) => {
//     try {
//         const { email, motDePasse } = req.body;

//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return res.status(404).send({ message: 'Adresse e-mail incorrecte ou compte inexistant' });
//         }

//         const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse);
//         if (!passwordMatch) {
//             return res.status(401).send({ message: 'Mot de passe incorrect' });
//         }

//         const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).send({ token: token, message: 'Connexion réussie', nom: user.nom });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Une erreur s\'est produite lors de la connexion' });
//     }
// };







// exports.loginFournisseur = async (req, res) => {
//     try {
//         const { email, motDePasse } = req.body;

//         const fournisseur = await Fournisseur.findOne({ email: email });
//         if (!fournisseur) {
//             return res.status(404).json({ message: 'Adresse e-mail incorrecte ou compte inexistant' });
//         }

//         const passwordMatch = await bcrypt.compare(motDePasse, fournisseur.motDePasse);
//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Mot de passe incorrect' });
//         }

//         const token = jwt.sign({ id: fournisseur._id, email: fournisseur.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).send({ token: token, message: 'Connexion réussie', nomFournisseur: fournisseur.nomFournisseur });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion' });
//     }
// };




// const BlacklistedToken = require('../models/blacklistedToken.model');

// exports.logout = async (req, res) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (authHeader) {
//             const token = authHeader.split(' ')[1];
//             const blacklistedToken = new BlacklistedToken({ token });
//             await blacklistedToken.save();
//         }

//         res.status(200).send({ message: 'Déconnexion réussie pour les utilisateurs' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Une erreur s\'est produite lors de la déconnexion' });
//     }
// };

// exports.logoutFournisseur = async (req, res) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (authHeader) {
//             const token = authHeader.split(' ')[1];
//             const blacklistedToken = new BlacklistedToken({ token });
//             await blacklistedToken.save();
//         }

//         res.status(200).send({ message: 'Déconnexion réussie pour les fournisseurs' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Une erreur s\'est produite lors de la déconnexion pour les fournisseurs' });
//     }
// };


// Blacklist to store tokens upon logout
//let tokenBlacklist = [];
// exports.logout = async (req, res) => {
//     try {
//         // Add token to blacklist
//         const authHeader = req.headers.authorization;
//         if (authHeader) {
//             const token = authHeader.split(' ')[1];
//             tokenBlacklist.push(token);
//         }

//         res.status(200).send({ message: 'Déconnexion réussie pour les utilisateurs' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Une erreur s\'est produite lors de la déconnexion' });
//     }
// };

// exports.logoutFournisseur = async (req, res) => {
//     try {
//         // Add fournisseur's token to blacklist
//         const authHeader = req.headers.authorization;
//         if (authHeader) {
//             const token = authHeader.split(' ')[1];
//             tokenBlacklist.push(token);
//         }

//         res.status(200).send({ message: 'Déconnexion réussie pour les fournisseurs' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Une erreur s\'est produite lors de la déconnexion pour les fournisseurs' });
//     }
// };


// exports.isLoggedIn = (req, res, next) => {
//     // Check if token is in the blacklist
//     const token = req.headers.authorization.split(' ')[1];
//     if (tokenBlacklist.includes(token)) {
//         return res.status(401).send({ message: 'Token invalide' });
//     }
//     next();
// };