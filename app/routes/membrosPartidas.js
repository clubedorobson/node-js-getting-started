module.exports = app => {
    const membrosPartidasController = require("../controllers/membrosPartidas");
    var router = require("express").Router();
    
    router.get('/:id', membrosPartidasController.findOne);
    
    app.use('/api/membrosPartidas', router);
};
