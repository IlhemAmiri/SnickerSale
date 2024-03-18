
const authenticateAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).send({ error: 'Accès interdit. Seul l\'administrateur peut accéder à cette ressource.' });
    }
};

const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'user') {
        return next();
    } else {
        return res.status(403).send({ error: 'Accès interdit. Seuls les utilisateurs peuvent accéder à cette ressource.' });
    }
};

const authenticateFournisseur = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'fournisseur') {
        return next();
    } else {
        return res.status(403).send({ error: 'Accès interdit. Seuls les fournisseurs peuvent accéder à cette ressource.' });
    }
};

module.exports = { authenticateAdmin, authenticateUser, authenticateFournisseur };

// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
// const Fournisseur = require('../models/fournisseur.model');

// const authenticateUser = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

//         if (!user) {
//             throw new Error();
//         }

//         req.token = token;
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Veuillez vous connecter.' });
//     }
// };

// const authenticateFournisseur = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const fournisseur = await Fournisseur.findOne({ _id: decoded.id, 'tokens.token': token });

//         if (!fournisseur) {
//             throw new Error();
//         }

//         req.token = token;
//         req.fournisseur = fournisseur;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Veuillez vous connecter.' });
//     }
// };

// module.exports = { authenticateUser, authenticateFournisseur };
