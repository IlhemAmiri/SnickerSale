module.exports = app => {
    const router = require('express').Router();
    const userController = require('../controllers/user.controller');
    const authController = require('../controllers/auth.controller');
    const fournisseurController = require('../controllers/fournisseur.controller');
    const produitController = require('../controllers/produit.controller');



    const adminController = require('../controllers/admin.controller');
    router.post('/admin', adminController.createAdmin);
    router.post('/admin/login', adminController.loginAdmin);
    router.post('/admin/logout', adminController.logoutAdmin);




    

    router.post('/users/login', authController.login);
    router.post('/users/logout', authController.logout); // authenticateUser,





    router.get('/users', userController.findAll);
    router.post('/users', userController.create);
    router.delete('/users/:id', userController.delete);
    router.get('/users/:id', userController.findOne);
    router.put('/users/:id', userController.update);


    router.post('/fournisseurs/login', authController.loginFournisseur);
    router.post('/fournisseurs/logout', authController.logout);// authenticateFournisseur,


    router.get('/fournisseurs', fournisseurController.findAll);
    router.post('/fournisseurs', fournisseurController.create);
    router.delete('/fournisseurs/:id', fournisseurController.delete);
    router.get('/fournisseurs/:id', fournisseurController.findOne);
    router.put('/fournisseurs/:id', fournisseurController.update);




    // Routes pour la gestion des produits
    router.post('/produits', produitController.create);
    router.get('/produits', produitController.findAll);
    router.get('/produits/:id', produitController.findOne);
    router.put('/produits/:id', produitController.update);
    router.delete('/produits/:id', produitController.delete);

    // Route pour la recherche de produits par nom
    
    router.get('/produits/search/by', produitController.searchByRange);


    app.use('/api', router);
}


    //const { authenticateUser, authenticateFournisseur } = require('../middleware/authMiddleware');

    // Routes for admin
    //router.get('/admin/dashboard', authenticateAdmin, adminController.dashboard);

    // Routes for users
    //router.get('/users/profile', authenticateUser, userController.profile);

    // Routes for fournisseurs
    //router.get('/fournisseurs/dashboard', authenticateFournisseur, fournisseurController.dashboard);
