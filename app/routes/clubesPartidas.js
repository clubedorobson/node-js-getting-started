module.exports = app => {
    const clubesPartidasController = require("../controllers/clubesPartidas");
    var router = require("express").Router();
    
    router.get('/:id', clubesPartidasController.findOne);
    router.get('/seasons/:clubId', clubesPartidasController.findSeasons)
    router.get('/:clubId/:seasonId', clubesPartidasController.getBySeason)

    app.use('/api/clubesPartidas', router);
};
